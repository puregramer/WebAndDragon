/***
 * file name : main.js
 * description : webcade main
 * create date : 2018-04-24
 * creator : saltgamer
 ***/
import Camera from './Camera';
import Entity from './Entity';
import Timer from './Timer';
import PlayerController from './traits/PlayerController';
import {loadEntities} from './entities';
import {loadFont} from './loaders/font';
import {createLevelLoader} from './loaders/level';
import {createCollisionLayer} from './layers/collision';
import {createDashboardLayer} from './layers/dashboard';
import {setupKeyboard} from './input';
import '../css/webndragon.css';
import VirtualPad, {bindTouchEvent, initPadContainer, isTouchDevice} from './virtualPad/VirtualPad';
import VirtualButton from './virtualPad/VirtualButton';
import Responsive from './Responsive';

function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(64, 64);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);

    return playerEnv;
}

async function main(canvas) {

    const responsive = new Responsive();
    canvas.width = responsive.screenWidth;
    canvas.height = responsive.screenHeight - responsive.tileSize;

    const context = canvas.getContext('2d');

    const [entityFactory, font] = await Promise.all([
        loadEntities(),
        loadFont(),
    ]);

    console.log('-> entityFactory: ', entityFactory);
    console.log('-> font: ', font);

    const loadLevel = await createLevelLoader(entityFactory);

    const level = await loadLevel('1-2');

    const camera = new Camera(responsive);

    const hero = entityFactory.elf();

    const playerEnv = createPlayerEnv(hero);
    level.entities.add(playerEnv);

    level.comp.layers.push(createCollisionLayer(level));
    level.comp.layers.push(createDashboardLayer(font, playerEnv));

    const input = setupKeyboard(hero);
    input.listenTo(window);

    let vPad;
    if (isTouchDevice()) {
        vPad = new VirtualPad({
            container: document.querySelector('#padContainer'),
            width: 50
        });

        const vButton = new VirtualButton({
            container: document.querySelector('#padContainer'),
            buttonEvent: (ev) => {
                console.log('--> vButton jump!', ev);
                if (ev.type === 'touchstart') {
                    hero.jump.start();
                } else {
                    hero.jump.cancel();
                }

            }
        });
        vButton.show();
    }

    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        // camera.pos.x = Math.max(0, hero.pos.x - 100);
        camera.pos.x = Math.max(0, hero.pos.x - 100);

        level.comp.draw(context, camera);

        if (isTouchDevice()) {
            vPad.draw();
            bindTouchEvent(vPad, hero);
        }

    };

    timer.start();

}

const canvas = document.querySelector('#screen');
main(canvas);

// initPadContainer(canvas);
// window.addEventListener('resize', () => initPadContainer(canvas), false);

