Class(function AvatarShader(_mesh, _shader) {
    Inherit(this, Component);
    const _this = this;
    //*** Constructor
    (function() {
        _shader.addUniforms({
            tMap: {value: null},     
            uColor: {value: new Color()},
            uColor2: {value: new Color()},
            uColor3: {value: new Color()},
            uBrightness: {value: 0.85},
        });
    })();
    //*** Event handlers
    //*** Public methods
});