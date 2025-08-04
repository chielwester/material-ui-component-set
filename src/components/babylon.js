(() => ({
  name: 'Babylon',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { useText } = B;
    const { content } = options;

    const {
      Engine,
      Scene,
      FreeCamera,
      Vector3,
      HemisphericLight,
      MeshBuilder,
    } = window.Babylon;

    const reactCanvas = useRef(null);
    let box;

    const onSceneReady = (scene) => {
      // This creates and positions a free camera (non-mesh)
      const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);

      // This targets the camera to scene origin
      camera.setTarget(Vector3.Zero());

      const canvas = scene.getEngine().getRenderingCanvas();

      // This attaches the camera to the canvas
      camera.attachControl(canvas, true);

      // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
      const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

      // Default intensity is 1. Let's dim the light a small amount
      light.intensity = 0.7;

      // Our built-in 'box' shape.
      box = MeshBuilder.CreateBox('box', { size: 2 }, scene);

      // Move the box upward 1/2 its height
      box.position.y = 1;

      // Our built-in 'ground' shape.
      MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);
    };

    const onRender = (scene) => {
      if (box !== undefined) {
        const deltaTimeInMillis = scene.getEngine().getDeltaTime();
        const rpm = 10;
        box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
      }
    };

    // set up basic engine and scene
    useEffect(() => {
      const { current: canvas } = reactCanvas;

      if (!canvas) return;

      const engine = new Engine(
        canvas,
        // antialias,
        // engineOptions,
        // adaptToDeviceRatio,
      );
      const scene = new Scene(engine);
      if (scene.isReady()) {
        onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === 'function') onRender(scene);
        scene.render();
      });

      const resize = () => {
        scene.getEngine().resize();
      };

      if (window) {
        window.addEventListener('resize', resize);
      }

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener('resize', resize);
        }
      };
    }, []);

    return (
      <div className={classes.root}>
        <canvas ref={reactCanvas} antialias /> {useText(content)}
      </div>
    );
  })(),
  styles: () => () => ({
    root: {},
  }),
}))();
