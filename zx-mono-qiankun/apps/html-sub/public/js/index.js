const render = $ => {
  $('#purehtml-container').html('Hello, render with jQuery');
  return Promise.resolve(10);
};

(global => {
  global['purehtml'] = {
    bootstrap: () => {
      console.log('purehtml bootstrap');
      return Promise.resolve();
    },
    mount: () => {
      console.log('purehtml mount');
      // eslint-disable-next-line no-undef
      return render($);
    },
    unmount: () => {
      console.log('purehtml unmount');
      return Promise.resolve();
    }
  };
})(window);
