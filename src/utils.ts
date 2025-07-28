export const removeFirst = (arr) => {
  arr.reverse().pop();
  arr.reverse();
  return arr;
};

export interface Salesman {
  id: number;
  name: string;
}

export enum COL0432 {
  date = "Date",
  dealID = "Reference#",
  empID = "Salesperson#",
  emp = "Salesperson Name",
  vehID = "Stock#",
  vehDesc = "Description",
  vehType = "Sale Type",
  commGross = "COMMBL GROSS",
  units = "Units",
  commAmount = "Commission Amount",
}

export interface Commission {
  gross: number;
  amount: number;
}

export interface DealData {
  dealID: string;
  excelDate: number;
  vehID: string;
  vehDesc: string;
  vehType: string;
  unitCount: number;
  commGross: number;
  commAmount: number;
}

export class Vehicle {
  public year: string;
  public make: string;
  public model: string;
  public desc: string;
  constructor(
    public id: string,
    private description: string,
    public saleType: string,
  ) {
    [this.year, this.make, this.model, this.desc] = description.split(",");
  }
}

export class Deal {
  public id: string;
  public date: string;
  public vehicle: Vehicle;
  public unitCount: number;
  public commission: Commission;
  constructor(data: DealData) {
    this.id = data.dealID;
    this.date = this.convertDate(data.excelDate);
    this.vehicle = new Vehicle(data.vehID, data.vehDesc, data.vehType);
    this.unitCount = data.unitCount;
    this.commission = { gross: data.commGross, amount: data.commAmount };
  }
  convertDate(dateNumber: number): string {
    const date = new Date((dateNumber - 25569) * 86400 * 1000).toDateString();
    const splitDate = date.split(" ");
    const combi = [splitDate[1], splitDate[2]];
    return combi.join(" ");
  }
}
