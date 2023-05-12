const spine = require('@esotericsoftware/spine-canvas');

class SpineAnimation {
  static getInstance() {
    if (!SpineAnimation.instance) {
      SpineAnimation.instance = new SpineAnimation();
    }
    return SpineAnimation.instance;
  }

  constructor() {
    this.lastFrameTime = Date.now() / 1000;
    this.canvas=null;
    this.context=null;
    this.assetManager=null;
    this.skeleton=null;
    this.animationState=null;
    this.bounds=null;
    this.skeletonRenderer=null;
  }

  async load() {
    this.canvas = document.getElementById('canvas-spine-animation');
    if (this.canvas) {
      this.context = this.canvas.getContext('2d');
      this.skeletonRenderer = new spine.SkeletonRenderer(this.context);
      this.skeletonRenderer.triangleRendering = true;

      // Load the assets.
      this.assetManager = new spine.AssetManager('../spineAssets');
      this.assetManager.loadText('spineboy-ess.json');
      this.assetManager.loadTextureAtlas('spineboy.atlas');
      await this.assetManager.loadAll();

      // Create the texture atlas and skeleton data.
      let atlas = this.assetManager.require('spineboy.atlas');
      let atlasLoader = new spine.AtlasAttachmentLoader(atlas);
      let skeletonJson = new spine.SkeletonJson(atlasLoader);
      let skeletonData = skeletonJson.readSkeletonData(
        this.assetManager.require('spineboy-ess.json')
      );

      // Instantiate a new skeleton based on the atlas and skeleton data.
      this.skeleton = new spine.Skeleton(skeletonData);
      this.skeleton.setToSetupPose();
      this.skeleton.updateWorldTransform();
      this.bounds = this.skeleton.getBoundsRect();

      // Spineboy's head bounding box attachment is not attached by default. Attach it.
      this.skeleton.setAttachment('head-bb', 'head');

      // Setup an animation state with a default mix of 0.2 seconds.
      let animationStateData = new spine.AnimationStateData(this.skeleton.data);
      animationStateData.defaultMix = 0.2;
      this.animationState = new spine.AnimationState(animationStateData);

      // Add a click listener to the canvas which checks if Spineboy's head
      // was clicked.
      this.canvas.addEventListener('click', (event) => {
        // Make the mouse click coordinates relative to the canvas.
        let canvasRect = this.canvas.getBoundingClientRect();
        let mouseX = event.x - canvasRect.x;
        let mouseY = event.y - canvasRect.y;

        // Create and update a SkeletonBounds instance for later hit testing.
        let skelBounds = new spine.SkeletonBounds();
        skelBounds.update(this.skeleton);

        // Check if the mouse coordinates are inside any of the bounding box
        // attachments of the skeleton. If so, play the jump animation, followed
        // by a looping run animation.
        if (skelBounds.containsPoint(mouseX, mouseY)) {
          let jumpEntry = this.animationState.setAnimation(0, 'jump', false);
          let walkEntry = this.animationState.addAnimation(0, 'run', true);
        }
      });
    }
    requestAnimationFrame(this.render);
  }

  render() {
    // Calculate the delta time between this and the last frame in seconds.
    let now = Date.now() / 1000;
    let delta = now - this.lastFrameTime;
    this.lastFrameTime = now;

    // Resize the canvas drawing buffer if the canvas CSS width and height changed
    // and clear the canvas.
    if (
      this.canvas.width != this.canvas.clientWidth ||
      this.canvas.height != this.canvas.clientHeight
    ) {
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Center the skeleton and resize it so it fits inside the canvas.
    this.skeleton.x = this.canvas.width / 2;
    this.skeleton.y = this.canvas.height - this.canvas.height * 0.1;
    let scale = (this.canvas.height / this.bounds.height) * 0.8;
    this.skeleton.scaleX = scale;
    this.skeleton.scaleY = -scale;

    // Update and apply the animation state, update the this.skeleton's
    // world transforms and render the this.skeleton.
    this.animationState.update(delta);
    this.animationState.apply(this.skeleton);
    this.skeleton.updateWorldTransform();
    this.skeletonRenderer.draw(this.skeleton);

    requestAnimationFrame(this.render);
  }
  // Checks if the point given by x/y are within the circle.

  pointInCircle(x, y, circleX, circleY, circleRadius) {
    let distX = x - circleX;
    let distY = y - circleY;
    return distX * distX + distY * distY <= circleRadius * circleRadius;
  }
}

export default SpineAnimation;
