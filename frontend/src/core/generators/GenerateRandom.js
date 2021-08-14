class GenerateRandom {
  constructor(props) {
    // this.contextThis = props._this
  }

  generateRandomString(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  generateRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
}

export default GenerateRandom
