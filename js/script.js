var system, emitter, color1, color2;
var camera, scene, renderer, stats, clock, spring, controls;

init();

function init() {
    
  addScene();
  addControls();
  addLights();
  addProton();
  addStats();
  animate();
}

function addScene() {
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 750;
  
 
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xffffff, 1, 10000);
   var geometry = new THREE.RingGeometry( 70, 70, 32 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
   var mesh = new THREE.Mesh( geometry, material );
   
  //clock = new THREE.Clock();
  

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);
  return mesh
}

function addControls() {
  controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 10.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;
}

function addLights() {
  var ambientLight = new THREE.AmbientLight(0x101010);
  scene.add(ambientLight);

  var pointLight = new THREE.PointLight(0xffffff, 2, 1000, 1);
  pointLight.position.set(0, 200, 200);
  scene.add(pointLight);
}




function addStats() {
  stats = new Stats();
  stats.showPanel(0);
  stats.dom.style.position = 'absolute';
  stats.dom.style.left = '0px';
  stats.dom.style.top = '0px';
  container.appendChild(stats.dom);
}

function addProton() {
  system = new Nebula.default();
  emitter = new Nebula.Emitter();
  
  color1 = new THREE.Color('red');
  color2 = new THREE.Color();
  var geometry = new THREE.RingGeometry( 78, 90, 64 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
   var mesh = new THREE.Mesh( geometry, material );
   
   

  emitter
    .setRate(
      new Nebula.Rate(new Nebula.Span(4, 50), new Nebula.Span(0.02))
    )
    .setInitializers([
      
      new Nebula.Position(new Nebula.MeshZone(mesh,3)),
      new Nebula.Mass(1),
      new Nebula.Radius(1, 2),
      new Nebula.Body(createSprite()),
      new Nebula.Life(3),
      new Nebula.RadialVelocity(20, new Nebula.Vector3D(6, 1, 0), 90),

    ])
    .setBehaviours([
      new Nebula.Gravity(0),
      new Nebula.Alpha(3, 0),
      new Nebula.Scale(0.1, 4),
      new Nebula.Color(color1, color2),
    ]);

  system.addEmitter(emitter.emit());
  system.addRenderer(new Nebula.SpriteRenderer(scene, THREE));
}

function createSprite() {
  var map = new THREE.TextureLoader().load('./img/dot.png');
  var material = new THREE.SpriteMaterial({
    map: map,
    color: 0xff0000,
    blending: THREE.AdditiveBlending,
    fog: true,
    visible: true,
  });

  return new THREE.Sprite(material);
}

function animate() {
  stats.begin();
  requestAnimationFrame(animate);
  render();
  stats.end();
}

var ctha = 0;
function render() {
  system.update();
  renderer.render(scene, camera);
  //controls.update();

  //camera.lookAt(scene.position);
  ctha += 0.01;
//   camera.position.x = Math.sin(ctha) * 500;
 // camera.position.z = Math.cos(ctha) * 500;
//   camera.position.y = Math.sin(ctha) ;
camera.rotateZ(0.002);

  Nebula.Debug.renderInfo(system, 3);
}

var tha = 0;

function onWindowResize() {}