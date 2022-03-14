import React, { useState, useEffect} from 'react';

const Matter = require('matter-js')

console.log(window.innerWidth, window.innerHeight);

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width: window.innerWidth,
        height: window.innerHeight - 5
    }
});

let height = window.innerHeight - 5;
let width = window.innerWidth;

let items = []
// create two boxes and a ground
for(let i = 0; i < 14; i++){

    let wallx = (width / 4) + (i % 7 * (width/12));
    let wally = i < 7 ? height / 3 : 2 * (height / 3);

    var circle1 = Bodies.circle(wallx + 20, wally, 20);
    var circle2 = Bodies.circle(wallx + 40, wally, 20);
    var circle3 = Bodies.circle(wallx + 20, wally + 20, 20);
    var circle4= Bodies.circle(wallx + 40, wally + 40, 20);
    var wall = Bodies.rectangle(wallx, wally, 10, 300, { isStatic: true });
    
    if(i == 6 || i == 13){
        items.push(wall);
        continue;
    }
    items.push(circle1, circle2, circle3, circle4, wall);
}

var ground1 = Bodies.rectangle( width / 2, height / 2, width / 2 + 10, 10, { isStatic: true });
var ground2 = Bodies.rectangle( width / 2, height / 2 + 314, width / 2 + 10, 10, { isStatic: true });

var bankwall1 = Bodies.rectangle( width / 8 - 100, height / 2, 10, height / 2, { isStatic: true });
var bankwall2 = Bodies.rectangle( width / 8 + 100, height / 2, 10, height / 2, { isStatic: true });
var bankwall3 = Bodies.rectangle( width / 8, 3 * height / 4 + 5, 210, 10, { isStatic: true });
var bankwall4 = Bodies.rectangle( 7 * width / 8 - 100, height / 2, 10, height / 2, { isStatic: true });
var bankwall5 = Bodies.rectangle( 7 * width / 8 + 100, height / 2, 10, height / 2, { isStatic: true });
var bankwall6 = Bodies.rectangle( 7 * width / 8, 3 * height / 4 + 5, 210, 10, { isStatic: true });
items.push(ground1, ground2, bankwall1, bankwall2, bankwall3, bankwall4, bankwall5, bankwall6);

// add all of the bodies to the world
Composite.add(engine.world, items);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

function GameComponent(){
    

    

    

    
}

export default GameComponent;