/**
 * Base
 */
const canvas = document.querySelector('canvas.webgl')

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Overlay
 */
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    vertexShader: `
            void main(){
                gl_position = vec4(position, 1.0);
            }
            `,
    fragmentShader: `
            uniform float uAlpha;
            void main(){
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0)
            }`,
    uniforms: {
        uAlpha: {
            value: 1.0
        }
    },
    transparent: true
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)

/**
 * Loaders
 */
const loadingManager = new THREE.LoadingManager(
    () => {
        window.setTimeout(() => {
            gsap.to(overlayMaterial.uniforms.uAlpha, {
                duration: 3,
                value: 0,
                delay: 1
            })
        }, 500)
    },
    () => {
        console.log('progress');
        console.error('error');
    }
)
/**
 * GLTF loader
 */

// let hummingbird = null;
// const gltfLoader = new THREE.GLTFLoader()
// gltfLoader.load(
//     './hummingbird/scene.gltf',
// (gltf) => {
//     hummingbird = gltf.scene
//     // scene.add(gltf.scene)

//     hummingbird.position.x = 5
//     hummingbird.rotation.x = Math.PI * 0.2
//     hummingbird.rotation.y = Math.PI * 5; 
//     hummingbird.rotation.z = Math.PI * 0.15

//     const radius = 0.6
//     hummingbird.scale.set(radius, radius, radius)
//     scene.add(hummingbird)
// })

/**
 * Scroll
 */
// GLTF loading
let hummingbird = null;
const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load('./hummingbird/scene.gltf', (gltf) => {
    hummingbird = gltf.scene;

    // Set initial rotation to face down on the x-axis
    hummingbird.position.x = 5;
    hummingbird.rotation.x = Math.PI / 2;  // Initially face down
    hummingbird.rotation.y = Math.PI;     // Face left (sideways)
    hummingbird.rotation.z = Math.PI * 0.15;

    // Set scale
    const radius = 0.73;
    hummingbird.scale.set(radius, radius, radius);

    scene.add(hummingbird);
});

// Scroll-based transformation
const transformHummingbird = [
    {
        rotationX: Math.PI / 2,  // Section 1: Face down (on x-axis)
        positionX: 5             // Set this to match the initial position.x value
    },
    {
        rotationX: Math.PI * 0.2, // Section 2: Rotate on X-axis to face left
        positionX: 5              // New position for Section 2
    },
    {
        rotationX: Math.PI * 2,       // Section 3: Flip upside-down
        positionX: 1.75             // Maintain position for Section 3
    },
    {
            rotationX: Math.PI * 2,   // Section 4: Set desired orientation for flying out of frame
            positionX: -20             // Move far out to the left 
    }
    
];


let scrollY = window.scrollY;
let currentSection = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    const newSection = Math.round(scrollY / sizes.height); // Scroll to the next section
    console.log(newSection);

    if (newSection !== currentSection) {
        currentSection = newSection;

        // Apply rotation and position based on section
        if (hummingbird) {
            gsap.to(hummingbird.rotation, {
                duration: 1.5,
                ease: 'power2.inOut',
                x: transformHummingbird[currentSection].rotationX, // Rotate based on section
            });

            gsap.to(hummingbird.position, {
                duration: 1.5,
                ease: 'power2.inOut',
                x: transformHummingbird[currentSection].positionX,
            });
        }
    }
});

/**
 * On Reload
 */
window.onbeforeunload = function() {
    window.scrollTo(0,0)
}

// Sizes and Renderer
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Camera setup
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 18;
scene.add(camera);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 2, 0);
scene.add(directionalLight);

// Renderer setup
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate loop
const clock = new THREE.Clock();
let lastElapsedTime = 0;
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - lastElapsedTime;
    lastElapsedTime = elapsedTime;

    // Animate the hummingbird's vertical movement
    if (hummingbird) {
        hummingbird.position.y = Math.sin(elapsedTime * 0.5) * 0.1 - 0.1;
    }

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();

