import Phaser from 'phaser';
import { onBeforeUnmount, ref } from 'vue';

export function useTowerGame() {
  const gameInstance = ref<Phaser.Game | null>(null);

  // OUTSIDE EXPORTED VALUE
  const score = ref(0);
  const isGameOver = ref(false);

  let time = 0;
  let blockReady = true;
  let latestBlock: Phaser.Physics.Matter.Image | null = null;

  let crane: Phaser.Physics.Matter.Image | null = null;
  let rope: Phaser.GameObjects.Image | null = null;
  let attachedFloor: Phaser.GameObjects.Image | null = null;

  const towerBlocks: Phaser.Physics.Matter.Image[] = [];

  const startGame = (container: HTMLElement | null) => {
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const unifiedHeightUnit = height * 0.15;
    const centerX = width * 0.5;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width,
      height,
      parent: container,
      transparent: true,
      physics: {
        default: 'matter',
        matter: {
          gravity: { x: 0, y: 0.8 },
          constraintIterations: 4,
          positionIterations: 8,
          velocityIterations: 6,
          enableSleeping: true,
        },
      },
      scene: { preload, create, update },
      input: { keyboard: true },
    };

    gameInstance.value = new Phaser.Game(config);

    function resetVars() {
      time = 0;
      blockReady = true;
      latestBlock = null;
      towerBlocks.length = 0;
      score.value = 0; // OUTSIDE REACTIVE
    }

    // ─────────────────────────────────────────────
    // PHASER preload()
    // ─────────────────────────────────────────────
    function preload(this: Phaser.Scene) {
      this.load.image('crane', '/png/crane.png');
      this.load.image('rope', '/png/rope.png');
      this.load.image('redBlockTexture', '/png/block-red.png');
      this.load.image('redBlockStartTexture', '/png/start-block-red.png');

      // ground texture missing in your preload → we generate it in create
      this.add
        .graphics()
        .fillStyle(0xa52a2a)
        .fillRect(0, 0, width, unifiedHeightUnit)
        .generateTexture('groundTexture', width, 40)
        .destroy();
    }

    // ─────────────────────────────────────────────
    // PHASER create()
    // ─────────────────────────────────────────────
    function create(this: Phaser.Scene) {
      resetVars();

      const currentScoreEl = document.getElementById('current-score');

      // walls
      this.matter.add.rectangle(-25, 0, 50, 20000, { isStatic: true }).label =
        'Rectangle Body';
      this.matter.add.rectangle(width + 25, 0, 50, 20000, {
        isStatic: true,
      }).label = 'Rectangle Body';
      this.matter.add.rectangle(width / 2, height + 1000, width * 2, 50, {
        isStatic: true,
      }).label = 'Rectangle Body';

      this.cameras.main.setBounds(0, -10000, width, 20000);

      // crane
      crane = this.matter.add.image(centerX, 0, 'crane');
      crane.setScale(unifiedHeightUnit / (crane.height * 2));
      crane.setStatic(true);

      // rope
      rope = this.add.image(centerX, 0, 'rope');
      rope.setScale(unifiedHeightUnit / (crane.height * 2) / 3);

      // attached floor
      attachedFloor = this.add.image(centerX, 0, 'redBlockTexture');
      attachedFloor.setScale(unifiedHeightUnit / attachedFloor.height);

      // static ground
      this.matter.add.image(
        width / 2,
        height - unifiedHeightUnit / 6,
        'groundTexture',
        undefined,
        { isStatic: true },
      );

      const groundFloor = this.matter.add.image(
        width / 2,
        height - unifiedHeightUnit / 6 - unifiedHeightUnit / 2,
        'redBlockStartTexture',
        undefined,
        { isStatic: true },
      );
      groundFloor.setScale(unifiedHeightUnit / groundFloor.height);
      (groundFloor.body as MatterJS.BodyType).label = 'groundFloor';

      // COLLISION HANDLER
      this.matter.world.on('collisionstart', (event: any) => {
        event.pairs.forEach((pair: any) => {
          const { bodyA, bodyB } = pair;

          // GAME OVER
          if (
            bodyA.isStatic &&
            bodyA.label === 'Rectangle Body' &&
            !bodyB.isStatic
          ) {
            triggerGameOver();
          }

          // BLOCK LANDED
          if (
            latestBlock &&
            (bodyA === latestBlock.body || bodyB === latestBlock.body)
          ) {
            const other = bodyA === latestBlock.body ? bodyB : bodyA;

            if (
              other.label === 'groundFloor' ||
              other.label === 'buildingBlock'
            ) {
              blockReady = true;
              towerBlocks.push(latestBlock);

              // CAMERA SCROLL FIX — always use LIVE scrollY
              const cam = this.cameras.main;

              if (towerBlocks.length > 1) {
                const newCameraY = cam.scrollY - unifiedHeightUnit;
                this.tweens.add({
                  targets: cam,
                  scrollY: newCameraY,
                  duration: 500,
                  ease: 'Power2.easeOut',
                });
              }

              latestBlock = null;
            }
          }
        });
      });

      score.value = 0;
      currentScoreEl!.textContent = `Score: ${score.value}`;
    }

    // ─────────────────────────────────────────────
    // PHASER update()
    // ─────────────────────────────────────────────
    function update(this: Phaser.Scene) {
      if (!crane || !rope || !attachedFloor) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const camY = this.cameras.main.scrollY;

      const moveRange = width * 0.25;
      const centerX = width * 0.5;

      // crane movement
      time += 0.02;
      crane.x = centerX + Math.sin(time) * moveRange;
      crane.y = camY + crane.displayHeight / 2;

      rope.x = crane.x;
      rope.y = crane.y + crane.displayHeight;

      attachedFloor.x = crane.x;
      attachedFloor.y =
        crane.y + crane.displayHeight / 2 + attachedFloor.displayHeight;

      const space = this.input.keyboard?.addKey('SPACE');
      if (!space) return;

      if (Phaser.Input.Keyboard.JustDown(space) && blockReady) {
        const block = this.matter.add.image(
          crane.x,
          crane.y + crane.displayHeight / 2 + attachedFloor.displayHeight,
          'redBlockTexture',
        );

        (block.body as MatterJS.BodyType).label = 'buildingBlock';
        block.setScale((height * 0.15) / block.height);

        latestBlock = block;
        blockReady = false;

        score.value++;
        const scoreEl = document.getElementById('current-score');
        scoreEl!.textContent = `Score: ${score.value}`;
      }
    }
    const triggerGameOver = () => {
      // Destroy Phaser game
      gameInstance.value?.destroy(true);
      gameInstance.value = null;
      isGameOver.value = true;
    };
  };

  const destroyGame = () => {
    gameInstance.value?.destroy(true);
    gameInstance.value = null;
    isGameOver.value = false;
    score.value = 0;
  };

  const restartGame = (container: HTMLElement | null) => {
    if (!container) return;
    // GameOver state zurücksetzen
    isGameOver.value = false;

    // Existierendes Spiel (falls noch eines läuft) sauber beenden
    if (gameInstance.value) {
      destroyGame();
    }

    // Neues Spiel starten
    startGame(container);
  };

  onBeforeUnmount(() => destroyGame());

  return {
    startGame,
    destroyGame,
    restartGame,
    score,
    isGameOver,
  };
}
