import { ICoord, IWeather, IMain, IWind, IClouds, ISys } from "./interface";

class WeatherEntity {
  coord: ICoord | null = null;
  weather: IWeather[] | null = null;
  base: string = "";
  main: IMain | null = null;
  visibility: number = 0;
  wind: IWind | null = null;
  clouds: IClouds | null = null;
  dt: number = 0;
  sys: ISys | null = null;
  timezone: number = 0;
  id: number = 0;
  name: string = "";
  cod: number = 0;
  constructor(weather: any) {
    if (!weather) return;
    Object.assign(this, weather);
  }
  static createListWeather(listWeather: any[]) {
    if (!Array.isArray(listWeather)) return [];
    return listWeather.map((weather: WeatherEntity) => {
      return new WeatherEntity(weather);
    });
  }
}

export default WeatherEntity;
