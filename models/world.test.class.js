import { World } from '../models/world.class.js';
import { Enemy } from '../models/enemy.class.js';

jest.mock('../models/enemy.class.js');

describe('World', () => {
    let world;
    let mockCtx;
    let mockEnemy;

    beforeEach(() => {
        mockCtx = {
            save: jest.fn(),
            translate: jest.fn(),
            scale: jest.fn(),
            drawImage: jest.fn(),
            restore: jest.fn()
        };

        mockEnemy = {
            img: new Image(),
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            otherDiretion: false,
            isStunned: false,
            showStunEffect: jest.fn()
        };

        world = new World({getContext: () => mockCtx}, {});
        world.debugMode = false;
    });
});
