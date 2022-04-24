import React, { Component } from "react";
import styled from "styled-components";

const BulletItem = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #000;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  position: relative;
  left: ${({ left }) => left};
`;

class Bullet extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      left: null,
    };

    this.bulletEl = React.createRef();
  }

  componentDidMount() {
    this.mount = true;
    this.animateBullet();
    console.log('bulletEl', this.bulletEl);
    // определить направление
    // получить положение пульки
    // получить ближ. препядствие
    // сравнить с
  }

  componentWillUnmount(): void {
    this.mount = false;
  }

  // в то время как timePassed идёт от 0 до 2000
  // left изменяет значение от 0px до 400px
  draw(timePassed) {
    console.log("draw", { timePassed, left: timePassed / 5 + "px" });
    this.mount && this.setState({ left: timePassed / 5 + "px" });
  }

  animateBullet() {
    const start = Date.now(); // запомнить время начала

    const timer = setInterval(() => {
      // сколько времени прошло с начала анимации?
      const timePassed = Date.now() - start;

      if (timePassed >= 2000 || !this.mount) {
        clearInterval(timer); // закончить анимацию через 2 секунды
        return;
      }

      // отрисовать анимацию на момент timePassed, прошедший с начала анимации
      this.draw(timePassed);
    }, 10);
  }

  render() {
    const { left } = this.state;
    // this.bulletEl?.current && console.log('bulletEl', {
    //   bulletEl: this.bulletEl,
    //   offsetLeft: this.bulletEl.current.offsetLeft,
    //   offsetTop: this.bulletEl.current.offsetTop
    // })
    
    return (
      <>
        <BulletItem className="bullet" left={left} ref={this.bulletEl}></BulletItem>
      </>
    );
  }
}

export default Bullet;
