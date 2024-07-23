$.confirm = function (options) {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: options.title,
      closable: true,
      onClose() {
        modal.destroy();
      },
      width: '300px',
      content: options.content,
      footerButtons: [
        {
          text: 'Cancel',
          type: 'primary',
          handler() {
            console.log('Primary btn clicked');
            modal.close();
            reject();
          },
        },
        {
          text: 'Delete',
          type: 'danger',
          handler() {
            console.log('Danger btn clicked');
            modal.close();
            resolve();
          },
        },
      ],
    });

    setTimeout(() => {
      modal.open();
    }, 100);
  });
};
