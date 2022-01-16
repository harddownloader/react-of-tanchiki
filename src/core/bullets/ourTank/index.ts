// import React from 'react';
// import BulletsLogic from '@/core/bullets/BulletsLogic'
import GenerateRandomWrap from "@/core/generators/GenerateRandom";
import { domain } from "@/configs/config";
import { v4 as uuidv4 } from 'uuid';

export default class OurTankBulletsLogic {
  constructor(props) {
    // super(props);
    this.contextThis = props._this;
    this.GenerateRandom = new GenerateRandomWrap();
  }

  async updateBulletStore() {
    return fetch(`${domain}player/bullets/decrement`)
      .then((response) => response.json())
      .then((data) => {
        // alert(data)
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  }

  async checkBulletsCount() {
    return await fetch(`${domain}player`)
      .then((response) => response.json())
      .then((data) => {
        // alert(data)
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  }

  async addOurTankBullet() {
    const playerInfo = await this.checkBulletsCount();
    console.log("playerInfo", playerInfo);
    if (playerInfo.countBullets !== 0) {
      console.log("addOurTankBullet", this);

      this.updateBulletStore();

      const ourBulletsTmp = this.contextThis.state.ourBullets;
      // const randomId = this.GenerateRandom.generateRandomString(10);
      const randomId = uuidv4();

      ourBulletsTmp.push({
        id: randomId,
        direction: this.contextThis.props.direction.directionCurrent,
        // started X,Y
        y: this.contextThis.state.ourTank.y,
        x: this.contextThis.state.ourTank.x,
      });
      this.contextThis.setState({ ourBullets: ourBulletsTmp });

      this.updateBulletStore();
    }
  }
}
