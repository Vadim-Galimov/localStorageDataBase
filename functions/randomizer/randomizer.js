const randomizer = {
  createUniqueId(prefix = "id") {
    while (true) {
      const id = prefix + Math.random().toString(16).slice(2);
      if (id !== null) {
        return id;
      }
    }
  },

  createUniqueClass(prefix = "class") {
    while (true) {
      const className = prefix + Math.random().toString(16).slice(2);
      if (className !== null) {
        return className;
      }
    }
  },
};
