import React, { useState, useEffect, useRef} from 'react';
import { Matter, Engine, Render, Bodies, World } from 'matter-js'

// var Engine = Matter.Engine,
//     Render = Matter.Render,
//     Runner = Matter.Runner,
//     Bodies = Matter.Bodies,
//     Composite = Matter.Composite,
//     MouseConstraint = Matter.MouseConstraint,
//     Mouse = Matter.Mouse;

// // create an engine
// var engine = Engine.create();
// var world = engine.world;

// // create a renderer
// var render = Render.create({
//     element: document.body,
//     engine: engine,
//     options: {
//         wireframes: false,
//         width: 1200,
//         height: 800,
//     }
// });



// let height = 800;
// let width = 1200;

// let items = []
// // create two boxes and a ground
// for(let i = 0; i < 14; i++){

//     let wallx = 300 + (i % 7 * 100);
//     let wally = i < 7 ? height / 2 + 150 : height / 2 - 150 ;

//     var circle1 = Bodies.circle(wallx + 30, wally - 100, 10);
//     var circle2 = Bodies.circle(wallx + 50, wally - 80, 10);
//     var circle3 = Bodies.circle(wallx + 30, wally - 100, 10);
//     var circle4= Bodies.circle(wallx + 50, wally - 80, 10);
//     var wall = Bodies.rectangle(wallx, wally, 10, 200, { isStatic: true });
    
//     if(i == 6 || i == 13){
//         items.push(wall);
//         continue;
//     }
//     items.push(circle1, circle2, circle3, circle4, wall);
// }

// var ground1 = Bodies.rectangle( 600, 355, width / 2 + 10, 10, { isStatic: true });
// var ground2 = Bodies.rectangle( 600, 655, width / 2 + 10, 10, { isStatic: true });

// var bankwall1 = Bodies.rectangle( width / 8 - 100, height / 2, 10, height / 2, { isStatic: true });
// var bankwall2 = Bodies.rectangle( width / 8 + 100, height / 2, 10, height / 2, { isStatic: true });
// var bankwall3 = Bodies.rectangle( width / 8, 3 * height / 4 + 5, 210, 10, { isStatic: true });
// var bankwall4 = Bodies.rectangle( 7 * width / 8 - 100, height / 2, 10, height / 2, { isStatic: true });
// var bankwall5 = Bodies.rectangle( 7 * width / 8 + 100, height / 2, 10, height / 2, { isStatic: true });
// var bankwall6 = Bodies.rectangle( 7 * width / 8, 3 * height / 4 + 5, 210, 10, { isStatic: true });
// items.push(ground1, ground2, bankwall1, bankwall2, bankwall3, bankwall4, bankwall5, bankwall6);

// // add all of the bodies to the world
// Composite.add(engine.world, items);

// // run the renderer
// Render.run(render);

// // create runner
// var runner = Runner.create();

// // run the engine
// Runner.run(runner, engine);

// let mouseX = 0,
//     mouseY = 0;

//   let canvas = document.getElementsByTagName("canvas")[0];
//     let context = canvas.getContext("2d");
    
//     context.beginPath();
//     context.rect(0,0,100,100);
//     context.fill();

//     window.onmousemove = (e) =>
//     {
    
//         // This gets the mouse coordinates (relative to the canvas). It uses the RGraph.getMouseXY(event)
//         // function
//         var rect = canvas.getBoundingClientRect();
//         mouseX  = e.clientX - rect.left;
//         mouseY  = e.clientY - rect.top;
//         // console.log(mouseX, mouseY);
//     }

//     window.onmousedown = () =>
//     {   
//         // console.log(mouseX)
//         console.log(world.bodies);

//         switch(true){
//             case mouseX > 300 && mouseX < 400:
//                 // console.log("first clicked");
//                 moveBalls(300, 400, 0);
//                 break;
//             case mouseX > 400 && mouseX < 500:
//                 // console.log("second clicked");
//                 moveBalls(400, 500, 0);
//                 break;
//             case mouseX > 500 && mouseX < 600:
//                 // console.log("third clicked");
//                 moveBalls(500, 600, 0);
//                 break;
//             case mouseX > 600 && mouseX < 700:
//                 moveBalls(600, 700, 0);
//                 //movefunction(1)
//                 break;
//             case mouseX > 700 && mouseX < 800:
//                 // console.log("fifth clicked");
//                 moveBalls(700, 800, 0);    
//                 break;
//             case mouseX > 800 && mouseX < 900:
//                 // console.log("sixth clicked");
//                 moveBalls(800, 900, 0);
//                 break;
            
//         }
//     }

// async function moveBalls(left, right, player){
//     let rem = [];
//     for(let i = 0; i < world.bodies.length; i++){
//         // console.log(typeof(world.bodies[i]))
//         let body = world.bodies[i];
//         let xpos = body.position.x;
//         if(xpos > left && xpos < right){
//             // console.log(world.bodies[i]);
//             rem.push(body);
//         }
//     }

//     let ballsamt = rem.length;

//     for(let i = 0; i < rem.length; i++){
//         Matter.World.remove(world, rem[i]); 
//     }

//     let spawnpoint = left + 50;
//     for(let i = 0 ; i < ballsamt; i++){
//         var circle1 = Bodies.circle(spawnpoint, 100, 10);
//         Matter.World.add(world, circle1);
//         spawnpoint += 100;
//         await new Promise(resolve => setTimeout(resolve, 400));
//     }
    


// }

function GameComponent(props){
    console.log(props);
    const scene = useRef();
    const engine = useRef(Engine.create());

  useEffect(() => {

    const height = 800;
    const width = 1200;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: 1200,
        height: 800,
        wireframes: false,
        background: 'transparent'
      }
    })

    for(let i = 0; i < 14; i++){

        let wallx = 300 + (i % 7 * 100);
        let wally = i < 7 ? 550 : 250 ;

        if(i == 6 || i == 13){
            World.add(engine.current.world, Bodies.rectangle(wallx, wally, 10, 200, { isStatic: true }))
            continue;
        }

        World.add(engine.current.world, [
            Bodies.circle(wallx + 30, wally - 100, 10),
            Bodies.circle(wallx + 50, wally - 80, 10),
            Bodies.circle(wallx + 30, wally - 100, 10),
            Bodies.circle(wallx + 50, wally - 80, 10),
            Bodies.rectangle(wallx, wally, 10, 200, { isStatic: true })
        ])
    }

    World.add(engine.current.world, [
        Bodies.rectangle( 600, 355, width / 2 + 10, 10, { isStatic: true }),
        Bodies.rectangle( 600, 655, width / 2 + 10, 10, { isStatic: true }),
        Bodies.rectangle( width / 8 - 100, height / 2, 10, height / 2, { isStatic: true }),
        Bodies.rectangle( width / 8 + 100, height / 2, 10, height / 2, { isStatic: true }),
        Bodies.rectangle( width / 8, 3 * height / 4 + 5, 210, 10, { isStatic: true }),
        Bodies.rectangle( 7 * width / 8 - 100, height / 2, 10, height / 2, { isStatic: true }),
        Bodies.rectangle( 7 * width / 8 + 100, height / 2, 10, height / 2, { isStatic: true }),
        Bodies.rectangle( 7 * width / 8, 3 * height / 4 + 5, 210, 10, { isStatic: true })
    ])

    Engine.run(engine.current)
    Render.run(render)

    return () => {
      Render.stop(render)
      World.clear(engine.current.world)
      Engine.clear(engine.current)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
    }
  }, [])

    let mouseX = 0,
        mouseY = 0;

    

    const handleMove = (e) =>
    {
        let canvas = document.getElementsByTagName("canvas")[0];
        let context = canvas.getContext("2d");
        
        context.beginPath();
        context.rect(0,0,100,100);
        context.fill();
    
        // This gets the mouse coordinates (relative to the canvas). It uses the RGraph.getMouseXY(event)
        // function
        var rect = canvas.getBoundingClientRect();
        mouseX  = e.clientX - rect.left;
        mouseY  = e.clientY - rect.top;
        // console.log(mouseX, mouseY);
    }

  const handleDown = () => {

        switch(true){
            case mouseX > 300 && mouseX < 400:
                // console.log("first clicked");
                moveBalls(300, 400, 0);
                break;
            case mouseX > 400 && mouseX < 500:
                // console.log("second clicked");
                moveBalls(400, 500, 0);
                break;
            case mouseX > 500 && mouseX < 600:
                // console.log("third clicked");
                moveBalls(500, 600, 0);
                break;
            case mouseX > 600 && mouseX < 700:
                moveBalls(600, 700, 0);
                //movefunction(1)
                break;
            case mouseX > 700 && mouseX < 800:
                // console.log("fifth clicked");
                moveBalls(700, 800, 0);    
                break;
            case mouseX > 800 && mouseX < 900:
                // console.log("sixth clicked");
                moveBalls(800, 900, 0);
                break;
            
        }
    }

  async function moveBalls(left, right, player){
        let rem = [];
        let bodies = engine.current.world.bodies;
        for(let i = 0; i < bodies.length; i++){
            let body = bodies[i];
            let xpos = body.position.x;
            if(xpos > left && xpos < right){
                rem.push(body);
            }
        }

        let ballsamt = rem.length;

        for(let i = 0; i < rem.length; i++){
            World.remove(engine.current.world, rem[i]); 
        }

        let spawnpoint = left + 50;
        for(let i = 0 ; i < ballsamt; i++){
            var circle1 = Bodies.circle(spawnpoint, 100, 10);
            World.add(engine.current.world, circle1);
            spawnpoint += 100;
            await new Promise(resolve => setTimeout(resolve, 400));
        }
    }

  return (
    <div
      onMouseDown={handleDown}
      onMouseMove={handleMove}
    >
      <div ref={scene} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default GameComponent;