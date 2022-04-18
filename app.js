document.addEventListener('DOMContentLoaded', () => {
    
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const alert = document.querySelector('#alert');
    let isJumping = false;
    let gravity = 0.9;
    let position = 0;
    let isGameOver = false;

    //===========================================================================
    document.addEventListener('keyup', control);

    function control(e) {
        if(e.keyCode === 32) {
            if(!isJumping) {
                isJumping = true;
                jump();
            }
        }
    } 

    //===========================================================================
    function jump() {

        let count = 0;
        let timerId = setInterval(function () {

            // Movin up
            position +=30;
            count ++;
            position = position * gravity;
            dino.style.bottom = position + 'px';
            console.log(count);

            // Movin down
            if(count === 15) {
                clearInterval(timerId);
                let downTimerId = setInterval(function() {
                    
                    if(count === 0) {
                        clearInterval(downTimerId);
                        isJumping = false;
                    }

                    position -= 5.3;
                    count --;
                    position = position * gravity;
                    dino.style.bottom = position + 'px';
                }, 20);
            }
        }, 20)
    }

    //===========================================================================
    function generateObstacles() {
        let randomTime = Math.random() * 4000;
        let obstaclesPosition = 1000;

        const obstacle = document.createElement('div');
        if(!isGameOver) {obstacle.classList.add('obstacle')};
        grid.appendChild(obstacle);
        obstacle.style.left = obstaclesPosition + 'px';

        let timerId = setInterval(function () {
            
            // Make it move ;p
            obstaclesPosition -=10;
            obstacle.style.left = obstaclesPosition + 'px';

            // Make it crash
            if(obstaclesPosition > 0 && obstaclesPosition < 60 && position < 60) {
                clearInterval(timerId);
                alert.innerHTML = 'Game Over :(';
                isGameOver = true;

                //remove all children when it crashes
                while(grid.firstChild) {
                    grid.removeChild(grid.lastChild)
                }
            }
        },20)

        if(!isGameOver) {setTimeout(generateObstacles, randomTime)} ; 
    }

     generateObstacles();
})