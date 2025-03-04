declare module "react-native-ble-advertise" {

  export interface BroadcastOptions {
    txPowerLevel?: number;
    advertiseMode?: number;
    includeDeviceName?: boolean;
    includeTxPowerLevel?: boolean;
    connectable?: boolean;
  }

  export function broadcast(uuid: string, myMajor: number, myMinor: number): Promise<void>;
  export function stopBroadcast(): Promise<void>;
  export function checkIfBLESupported(): Promise<void>;
  export function readRSSI(peripheralID: string): Promise<number>;
  export function setCompanyId(companyID: number): void;
}