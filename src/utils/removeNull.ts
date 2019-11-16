const removeNull = (value: object): object => {
    const notNull = {};
    Object.keys(value).forEach(key => {
      if (value[key] !== null) {
        notNull[key] = value[key];
      }
    });
    return notNull;
}

export default removeNull;