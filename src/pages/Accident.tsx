import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper
} from '@mui/material';
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

import { DriverInfoDto, HeartbeatsInfoDto } from '../interfaces/interface';
import driverService from '../services/driverService';
import heartbeatService from '../services/heartbeatService';
import useAuth from '../hooks/useAuth';

const Accident = () => {
  const {auth} = useAuth()
  const { t } = useTranslation();
  const [driver, setDriver] = useState<DriverInfoDto>();
  const [heartbeats, setHeartbeats] = useState([]) as any;

  useEffect(() => {
    const driverId = localStorage.getItem("driverId") as any;

    const fetchDriver = async () => {
      try {
        const drivers = await driverService.getDrivers(auth.bearear);
        const driver = drivers.find((driver) => driver.id === driverId);
        setDriver(driver);

      } catch (error) {
      }
    };

    const fetchHeartbeats = async () =>{
      try {
        const response = await heartbeatService.getHeartbeats(auth.bearer)
        console.log(response)
        setHeartbeats(response)
      }catch (error){
        console.error('Error fetching heartbeats:', error);
      }
    }

    fetchDriver();
    fetchHeartbeats();
  }, []);





  return (
    <Container>
      {driver ? (
        <>
          <Typography variant="h5" gutterBottom align="center" mt={3} mb={2}>
            {t("driverName")}: {driver?.driverName}
          </Typography>
          <Typography variant="h5" gutterBottom align="center" mt={3} mb={2}>
            {t("driverSurname")}: {driver?.driverSurname}
          </Typography>
          {Array.isArray(heartbeats) && heartbeats.length > 0 ? (
            <>
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("heartbeatCount")}</TableCell>
              <TableCell>{t("heartbeatDescription")}</TableCell>
              <TableCell>{t("heartbeatCreatedAt")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {heartbeats.map((heartbeat) => (
              <TableRow key={heartbeat.id}>
                <TableCell>{heartbeat.count}</TableCell>
                <TableCell>{heartbeat.description}</TableCell>
                <TableCell>{new Date(heartbeat.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
          </TableContainer>

            </>
          ) : (
            <Typography variant="h5" gutterBottom align="center" mt={10} mb={2}>
              {t("thereIsNoHeartbeats")}
            </Typography>
          )}


        </>
      ) : (
        <Typography variant="h5" gutterBottom align="center" mt={10} mb={2}>
          {t("thereIsNoDriver")}
        </Typography>
      )}

    </Container>
  );


};

export default Accident;
