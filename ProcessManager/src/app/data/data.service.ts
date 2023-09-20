export class UserService{
  info = {
    first: "firstadasd",
    second: 'secondasdasd'
  }

  getFirstInfo() {
    return this.info.first;
  }

  gestSecondInfo() {
    return this.info.second;
  }

  getAsynRandomData() {
    const newPromise = new Promise<string>((res, rej) => {
      setTimeout(()=>{
        res('Random data: asdadsasdasd');
      },3000)
    })
    return newPromise;
  }
}
