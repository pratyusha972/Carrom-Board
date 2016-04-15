var coinpos = [];
var cornerpos = [];
var wcoin = [];
var wcoin1,wcoin2,wcoin3,wcoin4,bcoin1,bcoin2,bcoin3,bcoin4,red,striker,corner1,corner2,corner3,corner4;
var renderer, scene, camera, pointLight, spotLight;
var count = 0;
var movement = 0;
var playerview = 0,topview = 0;
var dir;
var arrowHelper,origin;
var coinview = 0;
var chance = 0;
var main;
var notrest = 0;
var coinfall = 0;
var score1 = 0,score2 = 0;
function setup()
{
	//striker
	// 0th column => x co-ordinate
	//1st => y, 2nd => z 
	// 3rd column 3 => striker
	// 4th column 0 => on the board
	// 5th column is for velocity => all are initially at rest.
	// 6th => teta
	//  7th => time
	// 8th => initial x, 9th initial z;
	//10th => initial velocity
	var i;

	for(i = 0;i <= 9;i++)
	{
		coinpos[[i,1]] = 0.30;//y is constant for all
		coinpos[[i,7]] = 0; //time is 0 initially
		coinpos[[i,6]] = 0;// teta = 0
		coinpos[[i,5]] = 0; //velocity = 0
		coinpos[[i,4]] = 0; //on the board
		coinpos[[i,10]] = 0; //initial velocity
	} 
	coinpos[[0,6]] = 90;//intiliasing to 90
	coinpos[[0,5]] = 1;
	for(i = 1;i<=4;i++)//white 
		coinpos[[i,3]] = 1;
	for(i = 5;i<9;i++)//black
		coinpos[[i,3]] = 0;
	coinpos[[9,3]] = 2;//red 
	coinpos[[0,3]] = 3;//striker
	coinpos[[0,0]] = 0;
	coinpos[[0,2]] = 1.36;
	coinpos[[1,0]] = 0.27;
	coinpos[[1,2]] = 0.27;
	coinpos[[2,0]] = -0.27;
	coinpos[[2,2]] = -0.27;
	coinpos[[3,0]] = -0.27;
	coinpos[[3,2]] = 0.27;
	coinpos[[4,0]] = 0.27;
	coinpos[[4,2]] = -0.27;
	coinpos[[5,0]] = -0.38;
	coinpos[[5,2]] =0;
	coinpos[[6,0]] =0.38;
	coinpos[[6,2]] = 0;
	coinpos[[7,0]] = 0;
	coinpos[[7,2]] = 0.38;
	coinpos[[8,0]] = 0;
	coinpos[[8,2]] = -0.38;
	coinpos[[9,0]] = 0;
	coinpos[[9,2]] = 0;
	//for initial positions of strikers
	coinpos[[0,8]] = 0;
	coinpos[[0,9]] = 1.36;
	coinpos[[1,8]] = 0.27;
	coinpos[[1,9]] = 0.27;
	coinpos[[2,8]] = -0.27;
	coinpos[[2,9]] = -0.27;
	coinpos[[3,8]] = -0.27;
	coinpos[[3,9]] = 0.27;
	coinpos[[4,8]] = 0.27;
	coinpos[[4,9]] = -0.27;
	coinpos[[5,8]] = -0.38;
	coinpos[[5,9]] =0;
	coinpos[[6,8]] =0.38;
	coinpos[[6,9]] = 0;
	coinpos[[7,8]] = 0;
	coinpos[[7,9]] = 0.38;
	coinpos[[8,8]] = 0;
	coinpos[[8,9]] = -0.38;
	coinpos[[9,8]] = 0;
	coinpos[[9,9]] = 0;
	cornerpos[[0,0]]=1.82;
	cornerpos[[0,1]]=1.82;
	cornerpos[[1,0]]=-1.82;
	cornerpos[[1,1]]=-1.82;
	cornerpos[[2,0]]=1.82;
	cornerpos[[2,1]]=-1.82;
	cornerpos[[3,0]]=-1.82;
	cornerpos[[3,1]]=1.82;
	createScene();
	draw();
}

function createScene()
{
	var WIDTH = 800,
	  HEIGHT = 800;
	var c = document.getElementById("gameCanvas");
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, WIDTH/HEIGHT, 0.1, 1000 );
	scene.add(camera);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( WIDTH,HEIGHT );
	c.appendChild( renderer.domElement );
	camera.position.y = 4.5;
	camera.position.z = 3;
	camera.position.x = 0;
	camera.rotation.x = -50 * Math.PI/180;
	//camera.rotation.y = -180 * Math.PI/180;
	/*camera.position.y = 4;
	  camera.position.z = 0;
	  camera.position.x = 0;
	  camera.rotation.x = -90 * Math.PI / 180;

	 */



	function createcube(xsize,ysize,zsize,colorf,posx,posy,posz)
	{
		var geometry = new THREE.BoxGeometry( xsize, ysize, zsize );
		var material = new THREE.MeshBasicMaterial( { color: colorf } );
		var cube = new THREE.Mesh( geometry, material );
		cube.position.x = posx;
		cube.position.y = posy;
		cube.position.z = posz;
		//cube.rotation.y = 180 * Math.PI/180;
		scene.add(cube);
	}

	createcube(4,0.25,4,0xffe39f,0,0,0);

	//boundaries
	createcube(0.3,0.3,4.6,0xf4a460,2.15,0,0); //bright
	createcube(0.3,0.3,4.6,0xf4a460,-2.15,0,0); //bleft
	createcube(4.6,0.3,0.3,0xf4a460,0,0,-2.15); //bup
	createcube(4.6,0.3,0.3,0xf4a460,0,0,2.15); //bdown

	//inside dark
	createcube(3,0.01,3,0x654321,0,0.26,0); 

	//inside light
	createcube(2.96,0.01,2.96,0xffe39f,0,0.27,0); 

	function createcylinder(radu,radd,height,no,colorf,posx,posy,posz)
	{
		var geometry = new THREE.CylinderGeometry( radu, radd, height, no );
		var material = new THREE.MeshBasicMaterial( {color: colorf} );
		var some = new THREE.Mesh( geometry, material );
		some.position.x = posx;
		some.position.y = posy;
		some.position.z = posz;
		scene.add(some);
		return some;
	}

	function createcylinder2(radu,radd,height,no,colorf,posx,posy,posz)
	{
		var geometry = new THREE.CylinderGeometry( radu, radd, height, no );
		var material = new THREE.MeshBasicMaterial( {color: colorf} );
		var some = new THREE.Mesh( geometry, material );
		some.position.x = posx;
		some.position.y = posy;
		some.position.z = posz;
		scene.add(some);
		//	return some;
	}

	//cylinder center dark
	createcylinder2(0.5,0.5,0.01,100,0x654321,0,0.28,0);
	//cylinder center light inside
	createcylinder2(0.48,0.48,0.01,100,0xffe39f,0,0.29,0);

	//corners
	corner1 = createcylinder(0.12,0.12,0.01,200,0xa9a9a9,cornerpos[[0,0]],0.26,cornerpos[[0,1]]);
	corner2 = createcylinder(0.12,0.12,0.01,200,0xa9a9a9,cornerpos[[1,0]],0.26,cornerpos[[1,1]]);
	corner3 = createcylinder(0.12,0.12,0.01,200,0xa9a9a9,cornerpos[[2,0]],0.26,cornerpos[[2,1]]);
	corner4 = createcylinder(0.12,0.12,0.01,200,0xa9a9a9,cornerpos[[3,0]],0.26,cornerpos[[3,1]]);

	//four ring corners
	createcylinder2(0.12,0.12,0.01,200,0x654321,1.38,0.28,1.38);
	createcylinder2(0.12,0.12,0.01,200,0x654321,-1.38,0.28,1.38);
	createcylinder2(0.12,0.12,0.01,200,0x654321,1.38,0.28,-1.38);
	createcylinder2(0.12,0.12,0.01,200,0x654321,-1.38,0.28,-1.38);

	//white coins
	wcoin[1] = createcylinder(0.10,0.10,0.01,200,0xffffff,coinpos[[1,0]],coinpos[[1,1]],coinpos[[1,2]]);
	wcoin[2] = createcylinder(0.10,0.10,0.01,200,0xffffff,coinpos[[2,0]],coinpos[[2,1]],coinpos[[2,2]]);
	wcoin[3] = createcylinder(0.10,0.10,0.01,200,0xffffff,coinpos[[3,0]],coinpos[[3,1]],coinpos[[3,2]]);
	wcoin[4] = createcylinder(0.10,0.10,0.01,200,0xffffff,coinpos[[4,0]],coinpos[[4,1]],coinpos[[4,2]]);

	//black coins			
	wcoin[5] = createcylinder(0.10,0.10,0.01,200,0x000000,coinpos[[5,0]],coinpos[[5,1]],coinpos[[5,2]]);			
	wcoin[6] = createcylinder(0.10,0.10,0.01,200,0x000000,coinpos[[6,0]],coinpos[[6,1]],coinpos[[6,2]]);
	wcoin[7] = createcylinder(0.10,0.10,0.01,200,0x000000,coinpos[[7,0]],coinpos[[7,1]],coinpos[[7,2]]);
	wcoin[8] = createcylinder(0.10,0.10,0.01,200,0x000000,coinpos[[8,0]],coinpos[[8,1]],coinpos[[8,2]]);
	//red coins
	wcoin[9] = createcylinder(0.10,0.10,0.01,200,0xFF0000,coinpos[[9,0]],coinpos[[9,1]],coinpos[[9,2]]);
	//striker
	wcoin[0] = createcylinder(0.11,0.11,0.01,200,0x0000FF,coinpos[[0,0]],coinpos[[0,1]],coinpos[[0,2]]);

	dir = new THREE.Vector3( 0, 0, -1 );
	origin = new THREE.Vector3( wcoin[0].position.x, wcoin[0].position.y+0.01, wcoin[0].position.z );	
	length = 0.5;
	hex = 0x000000;

	arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
	scene.add( arrowHelper );
	arrowHelper.rotation.z = 0;
	/*	var render = fuction () {
		requestAnimationFrame( render );

	//cylinder.rotation.x += 0.1;
	//cylinder.rotation.y += 0.1;

	renderer.render(scene, camera);
	};

	render();*/
	//playerPaddleMovement();
}
function draw()
{	
	// draw THREE.JS scene
	renderer.render(scene, camera);
	// loop draw function call
	requestAnimationFrame(draw);
	if(movement == 1)
		movementfunction();
	playerPaddleMovement();
	friction();
	collisionfunction();
	equationfunction();
	cameraviews();
	wallcollision();
	coinfallfunction();
	if(coinview == 1)
	{
		camera.position.y = striker.position.y+0.8;
		camera.position.z = striker.position.z+0.5;
		camera.position.x = striker.position.x;
	}
	console.log(chance);

}
function MouseScroll(event) {

  if('wheelDelta' in event){
  rolled = event.wheelDelta;
  }
  else{
  rolled = -40*event.detail;
  }
  console.log("scroll", rolled);
}

document.addEventListener("DOMMouseScroll",MouseScroll, false); // for firefox
document.addEventListener("mousewheel",MouseScroll, false);
  // for other browsers*/

function playerPaddleMovement()
{
	if(count == 0)
	{
		if (Key.isDown(Key.A) || Key.isDown(Key.LEFT) )        
		{

			coinpos[[0,0]]-=0.1;
			coinpos[[0,8]]-=0.1;
			arrowHelper.position.x-=0.1;
			if(coinpos[[0,0]] <= -1.36)
			{
				coinpos[[0,0]] = -1.36;
				coinpos[[0,8]] = -1.36;
				arrowHelper.position.x=-1.36;
			}

		}
		else if (Key.isDown(Key.D) || Key.isDown(Key.RIGHT))
		{
			coinpos[[0,0]]+= 0.1;
			coinpos[[0,8]]+=0.1;
			arrowHelper.position.x+=0.1;
			if(coinpos[[0,0]] >= 1.36){
				coinpos[[0,8]]= 1.36;
				coinpos[[0,0]] = 1.36;
				arrowHelper.position.x = 1.36;
			}	  

		}
		else if (Key.isDown(Key.E))
		{
			count++;
			//position set

		}


	}
	else if(count == 1)
	{
		if (Key.isDown(Key.A) || Key.isDown(Key.LEFT) )        
		{
			arrowHelper.rotation.z+=0.1;
		}
		else if (Key.isDown(Key.D) || Key.isDown(Key.RIGHT))
		{
			arrowHelper.rotation.z-=0.1;
		}
		else if (Key.isDown(Key.I))
		{
			count++;
			//angle set
			coinpos[[0,6]] = 90 + arrowHelper.rotation.z*180/Math.PI;
			coinpos[[0,6]] = 360 - coinpos[[0,6]];

		}
		//console.log(arrowHelper.rotation.z);
	}
	else if(count == 2)
	{
		scene.remove( arrowHelper );
		if (Key.isDown(Key.Up))
		{
			coinpos[[0,10]]+=0.5;
		}
		else if(Key.isDown(Key.Down))
		{
			coinpos[[0,10]]-=0.5;
		}
		else if (Key.isDown(Key.T))
		{
			count=0;
			//console.log(count);
			//speed set
			movement = 1;
			coinpos[[0,5]] = coinpos[[0,10]];
			//movementfunction();
		}
	}
}
function movementfunction()
{
	for(var i=0;i<=9;i++)
	{	
		if(coinpos[[i,5]] > 1)
		{
			notrest = 1;
			coinpos[[i,7]]+= 0.01;
			coinpos[[i,0]] = coinpos[[i,8]] + (coinpos[[i,10]]*Math.cos(coinpos[[i,6]] * Math.PI/180)*coinpos[[i,7]]) - (0.05*coinpos[[i,7]]*coinpos[[i,7]]*5);
			coinpos[[i,2]] = coinpos[[i,9]] + coinpos[[i,10]]*Math.sin(30+coinpos[[i,6]] * Math.PI/180)*coinpos[[i,7]] - (0.05*coinpos[[i,7]]*coinpos[[i,7]]*5);
		}
		else if(coinpos[[i,5]] < 1)
			coinpos[[i,5]] = 0;
	}
	if(notrest == 0)
	{
		notrest = 1;
		if(chance == 0)
			chance = 1;
		if(chance == 1)
			chance = 0;
		movement=0;
		//player should change
		//console.log(notrest);
		setTimeout(2*1000);
		for(i = 0;i <= 9;i++)
			{
				//coinpos[[i,1]] = 0.30;//y is constant for all
				coinpos[[i,7]] = 0; //time is 0 initially
				coinpos[[i,6]] = 0;// teta = 0
				coinpos[[i,5]] = 0; //velocity = 0
				//coinpos[[i,4]] = 0; //on the board
				coinpos[[i,10]] = 0; //initial velocity
			} 

				coinpos[[0,0]] = 0;
				coinpos[[0,2]] = 1.36;
				coinpos[[0,8]] = 0;
				coinpos[[0,9]] = 1.36;
				coinpos[[0,1]] = 0.30;//y is constant for all
				coinpos[[0,7]] = 0; //time is 0 initially
				coinpos[[0,6]] = 0;// teta = 0
				coinpos[[0,5]] = 0; //velocity = 0
				coinpos[[0,4]] = 0; //on the board
				coinpos[[0,10]] = 0; //initial velocity
				dir = new THREE.Vector3( 0, 0, -1 );
	origin = new THREE.Vector3( coinpos[[0,0]], coinpos[[0,1]]+0.01, coinpos[[0,2]] );	
	var length = 0.5;
	var hex = 0x000000;
	arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
	arrowHelper.rotation.z = 0;
	scene.add( arrowHelper );
	
	}
	notrest = 0;
}  


function cameraviews()
{

	if(Key.isDown(Key.U))
	{
		coinview = 0;
		camera.position.y = 4;
		camera.position.z = 0;
		camera.position.x = 0;
		camera.rotation.x = -90 * Math.PI / 180;

	}
	else if(Key.isDown(Key.P))
	{
		coinview = 0;
		camera.position.y = 4.5;
		camera.position.z = 3;
		camera.position.x = 0;
		camera.rotation.x = -50 * Math.PI/180;

	}
	else if(Key.isDown(Key.C))
	{
		camera.position.y = 4.5;
		camera.position.z = 3;
		camera.position.x = 0;
		camera.rotation.x = -50 * Math.PI/180;
		camera.position.y = striker.position.y+0.8;
		camera.position.z = striker.position.z+0.5;
		coinview = 1;
		//coin view
	}		
}
function friction()
{
	for(var i = 0;i<= 9;i++)
	{
		if(coinpos[[i,5]]>0)
		{
			coinpos[[i,5]]= coinpos[[i,10]] - 0.5*coinpos[[i,7]]*5;
			//console.log(coinpos[[i,5]],i);
			
			
			
		}
	}
}
function wallcollision()
{
	for(var i=0;i<=9;i++)
	{
		//left wall and right wall
		if( coinpos[[i,0]] <= -1.84 || coinpos[[i,0]] >= 1.84)
		{
			coinpos[[i,6]] = 180 - coinpos[[i,6]];
			coinpos[[i,8]] = coinpos[[i,0]];
			coinpos[[i,9]] = coinpos[[i,2]];
			coinpos[[i,7]] = 0;
			if(coinpos[[i,0]]<= -1.84)
			{
				coinpos[[i,8]] = -1.75;
				coinpos[[i,0]] = -1.75;
			} 
			else if(coinpos[[i,0]] >= 1.84)
			{
				coinpos[[i,8]] = 1.75;
				coinpos[[i,0]] = 1.75;
			}
			if(coinpos[[i,6]] < 30)
				coinpos[[i,5]] = 0;
		}
		//up and down wall
		else if(coinpos[[i,2]] <= -1.84 || coinpos[[i,2]] >= 1.84)
		{
			coinpos[[i,6]] = 360 - coinpos[[i,6]];
			coinpos[[i,8]] = coinpos[[i,0]];
			coinpos[[i,9]] = coinpos[[i,2]];
			coinpos[[i,7]] = 0;
			if(coinpos[[i,2]]<= -1.84)
			{
				coinpos[[i,2]] = -1.75;
				coinpos[[i,9]] = -1.75;
			}
			else if(coinpos[[i,2]] >= 1.84)
			{
				coinpos[[i,2]] = 1.75;
				coinpos[[i,9]] = 1.75;
			} 
			//console.log(coinpos[[i,6]] * Math.PI/180);
			if(coinpos[[i,6]] < 30)
				coinpos[[i,5]] = 0;
		}
	}
} 
function collisionfunction()
{
	for(var i=0;i<=9;i++)
	{
		for(var j=0;j<=9;j++)
		{
			if((Math.sqrt(((coinpos[[i,0]]-coinpos[[j,0]])*(coinpos[[i,0]]-coinpos[[j,0]]))+((coinpos[[i,2]]-coinpos[[j,2]])*(coinpos[[i,2]]-coinpos[[j,2]]))) <= 0.20) && i!=j)
			{
				var collision_angle = Math.atan2(coinpos[[i,2]] - coinpos[[j,2]], coinpos[[i,0]] - coinpos[[j,0]]);
				var speed1 = coinpos[[i,5]];
				var speed2 = coinpos[[j,5]];

				var direction_1 = coinpos[[i,6]] * Math.PI/180;
				var direction_2 = coinpos[[j,6]] * Math.PI/180;
				var new_xspeed_1 = speed1 * Math.cos(direction_1 - collision_angle);
				var new_yspeed_1 = speed1 * Math.sin(direction_1 - collision_angle);
				var new_xspeed_2 = speed2 * Math.cos(direction_2 - collision_angle);
				var new_yspeed_2 = speed2 * Math.sin(direction_2 - collision_angle);

				var final_xspeed_1 = (new_xspeed_2);
				var final_xspeed_2 = (new_xspeed_1);
				var final_yspeed_1 = new_yspeed_1;
				var final_yspeed_2 = new_yspeed_2;

				var cosAngle = Math.cos(collision_angle);
				var sinAngle = Math.sin(collision_angle);
				var vx1 = cosAngle * final_xspeed_1 - sinAngle * final_yspeed_1;
				var vy1 = sinAngle * final_xspeed_1 + cosAngle * final_yspeed_1;
				var vx2 = cosAngle * final_xspeed_2 - sinAngle * final_yspeed_2;
				var vy2 = sinAngle * final_xspeed_2 + cosAngle * final_yspeed_2;
				//return [vx1, vy1, vx2, vy2];
				coinpos[[i,5]]= Math.sqrt((vx1*vx1)+(vy1*vy1));
				coinpos[[j,5]]= Math.sqrt((vx2*vx2)+(vy2*vy2));
				coinpos[[i,6]]= Math.atan2(vy1,vx1);
				coinpos[[j,6]]= Math.atan2(vy2,vx2);
				//console.log(coinpos[[j,6]]);
				coinpos[[i,7]]=0;
				coinpos[[j,7]]=0;
				coinpos[[i,8]] = coinpos[[i,0]];
				coinpos[[i,9]] = coinpos[[i,2]];
				coinpos[[j,8]] = coinpos[[j,0]];
				coinpos[[j,9]] = coinpos[[j,2]];
				coinpos[[i,10]]=coinpos[[i,5]];
				coinpos[[j,10]]=coinpos[[j,5]];
				//movementfunction();
			}
		}
	}
}

function equationfunction()
{
	for(var i = 0; i<= 9;i++)
	{
		if(coinpos[[i,4]] == 1)
			scene.remove(wcoin[i]);
	}
	wcoin[0].position.x = coinpos[[0,0]];
	wcoin[0].position.z = coinpos[[0,2]];
	wcoin[1].position.x = coinpos[[1,0]];
	wcoin[1].position.z = coinpos[[1,2]];
	wcoin[2].position.x = coinpos[[2,0]];
	wcoin[2].position.z = coinpos[[2,2]];
	wcoin[3].position.x = coinpos[[3,0]];
	wcoin[3].position.z = coinpos[[3,2]];
	wcoin[4].position.x = coinpos[[4,0]];
	wcoin[4].position.z = coinpos[[4,2]];
	wcoin[5].position.x = coinpos[[5,0]];
	wcoin[5].position.z = coinpos[[5,2]];
	wcoin[6].position.x = coinpos[[6,0]];
	wcoin[6].position.z = coinpos[[6,2]];	
	wcoin[7].position.x = coinpos[[7,0]];
	wcoin[7].position.z = coinpos[[7,2]];
	wcoin[8].position.x = coinpos[[8,0]];
	wcoin[8].position.z = coinpos[[8,2]];
	wcoin[9].position.x = coinpos[[9,0]];
	wcoin[9].position.z = coinpos[[9,2]];
	
}
function coinfallfunction()
{
	for(var i = 0;i<=9;i++)
	{
		for(var j=0;j<=3;j++)
		{
			if((Math.sqrt(((coinpos[[i,0]]-cornerpos[[j,0]])*(coinpos[[i,0]]-cornerpos[[j,0]]))+((coinpos[[i,2]]-cornerpos[[j,2]])*(coinpos[[i,2]]-cornerpos[[j,2]]))) <= 0.10))
			{
				if(chance == 0)
				{
					if(coinpos[[i,3]] == 1)
						score1 = score1+10;
					else if(coinpos[[i,3]] == 0)
						score2 = score2 + 10;
					else if(coinpos[[i,3]] == 2)
						score1 = score1+20;
				//document.getElementById("scores").innerHTML = score1 + "-" + score2;
				}
				else if(chance == 1)
				{
					if(coinpos[[i,3]] == 0)
						score2 = score2 + 10;
					else if(coinpos[[i,3]] == 1)
						score1 = score1 + 10;
					else if(coinpos[[i,3]] == 2)
						score2 = score2 + 20;
				//document.getElementById("scores").innerHTML = score1 + "-" + score2;
				}					
				coinfall = 1;
				//console.log(coinfall);
				//striker position initialisation
				coinpos[[0,0]] = 0;
				coinpos[[0,2]] = 1.36;
				coinpos[[0,8]] = 0;
				coinpos[[0,9]] = 1.36;
				coinpos[[0,1]] = 0.30;//y is constant for all
				coinpos[[0,7]] = 0; //time is 0 initially
				coinpos[[0,6]] = 0;// teta = 0
				coinpos[[0,5]] = 0; //velocity = 0
				coinpos[[0,4]] = 0; //on the board
				coinpos[[0,10]] = 0; //initial velocity
				if(i!=0)
				{
					coinpos[[i,4]] = 1;
					coinpos[[i,0]] = null;
					coinpos[[i,1]] = null;
					coinpos[[i,2]] = null;
					
					
				}
				break;
			}
		}
		if(coinfall == 1)
		{
			coinfall = 0;
			//all coins should come to rest
			for(i = 0;i <= 9;i++)
			{
				//coinpos[[i,1]] = 0.30;//y is constant for all
				coinpos[[i,7]] = 0; //time is 0 initially
				coinpos[[i,6]] = 0;// teta = 0
				coinpos[[i,5]] = 0; //velocity = 0
				//coinpos[[i,4]] = 0; //on the board
				coinpos[[i,10]] = 0; //initial velocity

			} 
			break;

		}
	}
}	
			
				
	
