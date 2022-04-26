import React, { useState, useEffect, useRef} from 'react';
import { Engine, Render, Bodies, World } from 'matter-js'
import { Socket } from 'socket.io-client';

function GameComponent(props){
    console.log(props);
    const scene = useRef();
    const engine = useRef(Engine.create());


    useEffect(() => {
        props.socket.on('movemade', move => {
            // console.log("MOVING FROM SOCKET");
          moveBalls(true, move[0], move[0] + 100, move[1]);
        })
    }, [props.socket])

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

        if(props.player == 1 && mouseY < 400) return;
        if(props.player == 2 && mouseY > 400) return;

        switch(true){
            case mouseX > 300 && mouseX < 400:
                // console.log("first clicked");
                moveBalls(false, 300, 400, props.player);
                break;
            case mouseX > 400 && mouseX < 500:
                // console.log("second clicked");
                moveBalls(false, 400, 500, props.player);
                break;
            case mouseX > 500 && mouseX < 600:
                // console.log("third clicked");
                moveBalls(false, 500, 600, props.player);
                break;
            case mouseX > 600 && mouseX < 700:
                moveBalls(false, 600, 700, props.player);
                //movefunction(1)
                break;
            case mouseX > 700 && mouseX < 800:
                // console.log("fifth clicked");
                moveBalls(false, 700, 800, props.player);    
                break;
            case mouseX > 800 && mouseX < 900:
                // console.log("sixth clicked");
                moveBalls(false, 800, 900, props.player);
                break;
            
        }
    }

  async function moveBalls(incoming, left, right, player){

    if(!incoming){
        props.socket.emit('movemade', [left, player]);
    }

        let rem = [];
        let bodies = engine.current.world.bodies;
        for(let i = 0; i < bodies.length; i++){
            let body = bodies[i];
            let xpos = body.position.x;
            let ypos = body.position.y;
            if(player == 1 && xpos > left && xpos < right && ypos > 400){
                rem.push(body);
            }
            if(player == 2 && xpos > left && xpos < right && ypos < 400){
                rem.push(body);
            }
        }

        let ballsamt = rem.length;

        for(let i = 0; i < rem.length; i++){
            World.remove(engine.current.world, rem[i]); 
        }

        let offset = 0;
        if(player == 1){
            offset = 100
        }
        else{
            offset = -100;
        }
        let spawnpoint = (left+right) / 2;
        let spawnheight = 100;
        if(player == 1){
            spawnheight = 420;
        }
        
        for(let i = 0 ; i < ballsamt; i++){

            if(spawnpoint > 950){
                spawnpoint = 950;
                spawnheight = 100;
                offset = - 100;
            } 
            if(spawnpoint < 250){
                spawnpoint = 250;
                spawnheight = 420;
                offset = 100;
            }

            spawnpoint += offset;
            if(spawnpoint > 900 && spawnpoint < 1100 || spawnpoint < 300){
                spawnpoint += offset * .5;
            }

            var circle1 = Bodies.circle(spawnpoint, spawnheight, 10);
            // console.log(spawnpoint, spawnheight);
            World.add(engine.current.world, circle1);

            
            
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