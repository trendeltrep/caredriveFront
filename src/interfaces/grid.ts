import { GridValidRowModel } from "@mui/x-data-grid/models";
import { AccidentInfoDto, DriverCarInfoDto, DriverInfoDto, UserInfoDto, WatcherInfoDto } from "./interface";
import { CarInfoDto } from "./car";
import { ServiceInfoDto } from "./service";
import { TripFullInfo } from "./trip";

export interface GridWatcher extends WatcherInfoDto, GridValidRowModel { }
export interface GridDriver extends DriverInfoDto, GridValidRowModel { }
export interface GridDriverCar extends DriverCarInfoDto, GridValidRowModel { }
export interface GridAccident extends AccidentInfoDto, GridValidRowModel { }