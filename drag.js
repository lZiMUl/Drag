class Drag {

  static browserWidth = document.documentElement.clientWidth || document.body.clientWidth;
  static browserHeight = document.documentElement.clientHeight || document.body.clientHeightclientHeight;
  static tagsName = ['div', 'span'];

  constructor(item) {
    Drag.reset(Drag.tagsName);

    if (Drag.tagsName.find((_item) => _item.toLocaleUpperCase() === item.nodeName)) {
      item.setAttribute('style', 'position: absolute;');
      item.addEventListener('touchstart', Drag.touchStart.bind(item));
    };
  };

  static touchStart({ touches }) {
    const [{
      clientX,
      clientY,
    }, {
      offsetLeft,
      offsetTop
    }] = [
        touches[0],
        this
      ];

    this.disX = clientX - offsetLeft;
    this.disY = clientY - offsetTop;

    this.addEventListener('touchmove', Drag.touchMove.bind(this));
  };

  static touchMove({ touches }) {
    const [{
      clientX,
      clientY,
    }, {
      offsetWidth,
      offsetHeight
    }] = [
        touches[0],
        this
      ];

    let [
      X,
      Y
    ] = [
        clientX - this.disX,
        clientY - this.disY
      ];

    if (X >= Drag.browserWidth - offsetWidth) {
      X = Drag.browserWidth - offsetWidth;
    };

    if (X < 0) {
      X = 0;
    };

    if (Y >= Drag.browserHeight - offsetHeight) {
      Y = Drag.browserHeight - offsetHeight;
    };

    if (Y < 0) {
      Y = 0;
    };

    this.style.left = X + 'px';
    this.style.top = Y + 'px';
  };

  static reset(arr) {
    Drag.tagsName = Array.from(new Set(arr));
  };
};

export default Drag;
