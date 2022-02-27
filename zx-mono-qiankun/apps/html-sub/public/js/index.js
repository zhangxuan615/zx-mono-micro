console.log('start parse html-sub');

const render = async () => {
  document.getElementById('purehtml-container').innerHTML = 'Hello, render with html-sub';
};

(global => {
  global['purehtml'] = {
    bootstrap: async () => {
      console.log('purehtml bootstrap');
    },
    mount: async () => {
      console.log('purehtml mount');
      render();
    },
    unmount: async () => {
      console.log('purehtml unmount');
    }
  };
})(window);
