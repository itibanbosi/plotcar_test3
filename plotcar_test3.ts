let wait = 0;
let hasuu_mae;
let hasuu_ato;
let tugi_iti=0;


enum pen_onoff {
  up,
  down,
}
enum plotter_houkou {
    前,
    後,
    }
enum onoff {
  無効,
  有効,
}

enum houkou {
    右,
    左,
    ななめ右,
    ななめ左,
}


enum microbit_version {
    Version1,
    Version2,
    Test_A,
    Test_B,
    }


let cond_Distance=1;
let cond_degree=1;
let microbit_wait=700;

let Stepping = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  ];

let Stepping0 = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  ];
let Stepping1 = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0], 
  ];
let SteppingF_0 = [
  [1,0,0,0],
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1],
  [1,0,0,0],
  [0,1,0,0],
  [0,0,1,0], 
  ];
  let SteppingF_1 = [
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1],
  [1,0,0,0],
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1], 
  ];
  let SteppingF_2 = [
  [0,0,1,0],
  [0,0,0,1],
  [1,0,0,0],
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1],
  [1,0,0,0], 
  ];
let SteppingF_3 = [
  [0,0,0,1],
  [1,0,0,0],
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1],
  [1,0,0,0],
  [0,1,0,0], 
  ];  

let SteppingB_0 = [
  [0,0,0,1],
  [0,0,1,0],
  [0,1,0,0],
  [1,0,0,0],
  [0,0,0,1],
  [0,0,1,0],
  [0,1,0,0], 
  ];
  let SteppingB_1 = [

  [0,0,1,0],
  [0,1,0,0],
  [1,0,0,0],
  [0,0,0,1],
  [0,0,1,0],
  [0,1,0,0], 
  [1,0,0,0],  
  ];

  let SteppingB_2 = [
  [0,1,0,0],
  [1,0,0,0],
  [0,0,0,1],
  [0,0,1,0],
  [0,1,0,0],
  [1,0,0,0],
  [0,0,0,1],
    ];
let SteppingB_3 = [

  [1,0,0,0], 
  [0,0,0,1],
  [0,0,1,0],
  [0,1,0,0],
  [1,0,0,0],
  [0,0,0,1],
  [0,0,1,0],
  ];  
  
  let Stepping_R = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  ];

let Stepping_L = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  ];



let moter_number=0;

//% color="#3943c6" block="ﾌﾟﾛｯﾀｰ・ｶｰVer1.4" icon="\uf1b9"
namespace eureka_plotter_car {

function  moter(kyori:number,R_zengo:number,L_zengo:number){
    led.enable(false);
    let i=0;

    /* 端数の計算計算  */

    let kyori_hasuu=kyori%1;
    serial.writeValue("kyori_hasuu", kyori_hasuu);
    let kyori_seisuu=Math.floor(kyori);
    serial.writeValue("kyori_seisuu", kyori_seisuu);


    /*右ステッピングの処理*/
    switch (R_zengo) {
      case 0:
        Stepping_R = Stepping0;
        break;
      case 2:
        Stepping_R=SteppingF_0
/*
        for (let a=tugi_iti ; a<4+tugi_iti ; a++) {
            for (let b=0 ; b<4 ;b++){
            Stepping_R[a-tugi_iti,b] = SteppingF_1[a,b];
            }
        }
*/
        break;
      case 1:
        Stepping_R=SteppingF_0
/*
        for (let a=tugi_iti ; a<4+tugi_iti ; a++) {
            for (let b=0 ; b<4 ;b++){
            Stepping_R[a-tugi_iti,b] = SteppingF_1[a,4-b];
            }
        }
*/
        break;
    }
        Stepping_L=SteppingF_0
    /*左ステッピングの処理*/
    switch (L_zengo) {
      case 0:
            Stepping_L = Stepping0;
        break;
      case 2:
        Stepping_L=SteppingF_0
/*        for (let a=tugi_iti ; a<4+tugi_iti ; a++) {
            for (let b=0 ; b<4 ;b++){
            Stepping_L[a-tugi_iti,b] = SteppingB_0[a,4-b];
            }
        }
*/
        break;
      case 1:
/*
        for (let a=tugi_iti ; a<4+tugi_iti ; a++) {
            for (let b=0 ; b<4 ;b++){
                Stepping_L[a-tugi_iti,b] = SteppingB_0[a,b];
            }
        }
*/
        break;
    }
    serial.writeValue("tugi_iti",tugi_iti);
    　　　
    /*  整数部の処理　 */ 
    for (let index = 0; index < kyori_seisuu; index++) {
    let Data1=0;
    while ( Data1 < 4){

      pins.digitalWritePin(DigitalPin.P3, Stepping_R[Data1][0]);
      pins.digitalWritePin(DigitalPin.P13, Stepping_L[Data1][0]);
      pins.digitalWritePin(DigitalPin.P4, Stepping_R[Data1][1]);
      pins.digitalWritePin(DigitalPin.P14, Stepping_L[Data1][1]);
      pins.digitalWritePin(DigitalPin.P6, Stepping_R[Data1][2]);
      pins.digitalWritePin(DigitalPin.P15, Stepping_L[Data1][2]);
      pins.digitalWritePin(DigitalPin.P7, Stepping_R[Data1][3]);
      pins.digitalWritePin(DigitalPin.P16, Stepping_L[Data1][3]);
      Data1=Data1+1;
      for (i = 0; i < microbit_wait; i++);
      {
      }
      }
    }

   /* 端数分の進み方と処理  */
　  let step_number=Math.floor(kyori_hasuu*10/2.5);
    let Data1=0;
    while ( Data1 < step_number){
      serial.writeValue("Data1", Data1);
      pins.digitalWritePin(DigitalPin.P3, Stepping_R[Data1][0]);
      pins.digitalWritePin(DigitalPin.P13, Stepping_L[Data1][0]);
      pins.digitalWritePin(DigitalPin.P4, Stepping_R[Data1][1]);
      pins.digitalWritePin(DigitalPin.P14, Stepping_L[Data1][1]);
      pins.digitalWritePin(DigitalPin.P6, Stepping_R[Data1][2]);
      pins.digitalWritePin(DigitalPin.P15, Stepping_L[Data1][2]);
      pins.digitalWritePin(DigitalPin.P7, Stepping_R[Data1][3]);
      pins.digitalWritePin(DigitalPin.P16, Stepping_L[Data1][3]);
      Data1=Data1+1;
      for (i = 0; i < microbit_wait; i++);
      {
      }
      }
    tugi_iti=(step_number+tugi_iti)%4;

}

  //% color="#ff3d03" weight=90 blockId=auto_led_off block="ﾏｲｸﾛﾋﾞｯﾄのLEDを |%Matrix_LED| にする" group="1 初期設定"
  export function auto_led_off(Matrix_LED:onoff) {
    switch(Matrix_LED){
        case onoff.無効:
        led.enable(false);
        break;
        case onoff.有効:
        led.enable(true);
    }
  }

  //% color="#ff3d03" weight=90 blockId=Microbit_Version_info block="ﾏｲｸﾛﾋﾞｯﾄのバージョンを設定する |%Version_info| にする" group="1 初期設定"
  export function microbit_version_info(Version_info : microbit_version) {
    switch(Version_info){
        case microbit_version.Version1:
        microbit_wait=800;
        break;
        case microbit_version.Version2:
        microbit_wait=7000;
        break;
        case microbit_version.Test_A:
        microbit_wait=10000;
        break;       
        case microbit_version.Test_B:
        microbit_wait=20000;
        break;       
    }
  }

  //% color="#009CA0" weight=96 blockId=eureka_relay block="ペン |%mode| " group="2 ペンの状態"
  export function plottercar_pen(mode: pen_onoff) {
    if (mode == pen_onoff.down) {
      pins.servoWritePin(AnalogPin.P8, 0);
      basic.pause(1000);
    }
    if (mode == pen_onoff.up) {
      pins.servoWritePin(AnalogPin.P8, 90);
      basic.pause(100);
    }
  }

  //% color="#3943c6" weight=80　blockId=plottercar_1sou_forward
  //% block="前へ |%F_cm| ｃｍ進む" group="3　基本の動き"
    export function plottercar_1sou_forward(F_cm: number): void {
    moter_number= F_cm / (18.9*cond_Distance) * 512;
    moter(moter_number,1,1);
    }


  //% color="#3943c6" weight=78　blockId=plottercar_1sou_back
  //% block="後ろへ |%F_cm| ｃｍ進む" group="3　基本の動き"
    export function plottercar_1sou_back(F_cm: number): void {
    moter_number= F_cm / (18.9*cond_Distance) * 512;
    moter(moter_number,2,2);
       }


  //% color="#3943c6" weight=76　blockId=plottercar_L_cycle
  //% block="左回り　角度 |%L_degree| " group="3　基本の動き"
  export function plottercar_L_cycle(L_degree: number): void {
    moter_number= L_degree / 360 * 512 * 1.62*cond_degree;
    moter(moter_number,1,2);
   }
 
  //% color="#3943c6" weight=74　blockId=plottercar_R_cycle
  //% block="右回り　角度 |%R_degree| " group="3　基本の動き"
  export function plottercar_R_cycle(R_degree: number): void {
    moter_number= R_degree / 360 * 512 * 1.62*cond_degree;
    moter(moter_number,2,1);
  }

  //% color="#ff4940" weight=71　blockId=plottercar_rest
  //% block="停止状態（電流ＯＦＦ）" group="3　基本の動き"
  export function plottercar_frest(): void {
    moter_number= 1;
    moter(moter_number,0,1);
  }

  //% color="#3943c6" weight=55　blockId=plottercar_R_step
  //% block="右車輪　 ４×|%R_step|ステップ |%houkou|方向" group="3　基本の動き"

  export function plottercar_R_step(R_step: number,houkou:plotter_houkou): void {
    moter_number= R_step;
        switch(houkou){
        case plotter_houkou.前:
            moter(R_step,1,0);
        return;   
        case plotter_houkou.後:
            moter(R_step,2,0);      
        return;
    }
}
  //% color="#3943c6" weight=58　blockId=plottercar_L_step
  //% block="左車輪　 ４×|%L_step|ステップ |%houkou|方向" group="3　基本の動き"

  export function plottercar_L_step(L_step: number,houkou:plotter_houkou): void {
    moter_number= L_step;
        switch(houkou){
        case plotter_houkou.前:
            moter(L_step,0,1); 
        return;   
        case plotter_houkou.後:
            moter(L_step,0,2);    
        return;
    }
} 

  //% color="#009A00" weight=40　blockId=polygon
  //% block="多角形作図 |%digree_step| 角形　一辺の長さ |%Edge_Num| cm " group="4　図形"
  export function polygon(digree_step: number,Edge_Num:number): void {

    for (let index = 0; index < digree_step; index++) {
        eureka_plotter_car.plottercar_1sou_forward(Edge_Num)
        eureka_plotter_car.plottercar_L_cycle(360/digree_step)
     }
    plottercar_frest()
    }


  //% color="#009A00" weight=39　blockId=cycle
  //% block="円の作図 直径 |%D_Num| cm " group="4　図形"
  export function cycle(D_Num:number): void {
    let cir = D_Num * 3.14
    let Foward_D =  cir/ 60
    for (let index = 0; index < 60; index++) {
        eureka_plotter_car.plottercar_1sou_forward(Foward_D)
        eureka_plotter_car.plottercar_R_cycle(360 / 60)
    }
  }


  //% color="#3943c6" weight=72　blockId=plottercar_houkou
  //% block="ほうこうを変える |%muki| へ " group="3　基本の動き"
    export function plottercar_houkou(muki: houkou): void {
        switch(muki){
            case houkou.右:
                return eureka_plotter_car.plottercar_R_cycle(90)
            case houkou.左:
                return eureka_plotter_car.plottercar_L_cycle(90);
            case houkou.ななめ右:
                return eureka_plotter_car.plottercar_R_cycle(45);
            case houkou.ななめ左:
                return eureka_plotter_car.plottercar_L_cycle(45);
        }
    }

  //% color="#ffa800" weight=20　blockId=plotter_Distance
  //% block="進行距離調整(1→1/1000)  短く |%Dis| 長く" group="5 調整"
  //% Dis.min=-30 Dis.max=30
  export function plotter_Distance(Dis: number): void {
    cond_Distance = (1+Dis/1000);
  }

  //% color="#ffa800" weight=18　blockId=plotter_degree
  //% block="回転角度調整（1→1/1000）  少なく回転 |%Deg| 多く回転" group="5 調整"
  //% Deg.min=-30 Deg.max=30
  export function plotter_degree(Deg: number): void {
    cond_degree = (1+Deg/1000);
  }

}

