import {
    Box,
    Button,
    Collapse,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SelectServicesModal from '../components/SelectServicesModal';
import useAuth from '../hooks/useAuth';
import { DriverInfoDto } from '../interfaces/interface';
import driverService from '../services/driverService';

const DriverStatus = () => {
  const { auth } = useAuth();
  const { t } = useTranslation();
  const [drivers, setDrivers] = useState<DriverInfoDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTakeDriver = (driver) => {
    if(driver.isTaken === "FREE"){
      driverService.takeWatcher(auth.bearer,driver.id,id)
    }
    else{
      driverService.deleteWatcher(driver.id)
    }
  };



  const fetchDrivers = async () =>{
    try{
      const response = await driverService.getDrivers()
      setDrivers(response)
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  }

  useEffect(() => {

    fetchDrivers();
  }, [auth.bearer]);



  return (
    <Container>
      <Typography variant="h5" gutterBottom align="center" mt={3} mb={2}>
        {t("drivers")}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("driverId")}</TableCell>
              <TableCell>{t("driverName")}</TableCell>
              <TableCell>{t("driverSurname")}</TableCell>
              <TableCell>{t("phone")}</TableCell>
              <TableCell>{t("driverStatus")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((driver) => (
              <React.Fragment key={driver.id}>
                <TableRow>
                  <TableCell>{driver.id}</TableCell>
                  <TableCell> {driver.driverName} </TableCell>
                  <TableCell> {driver.driverSurname} </TableCell>
                  <TableCell> {driver.phone} </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        handleTakeDriver(driver)

                      }}
                    >
                      { driver.isTaken==="TAKEN"? t("taken") : t("takeDriver")}
                    </Button>
                  </TableCell>
                </TableRow>

              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SelectServicesModal open={isModalOpen} onClose={handleCloseModal} tripId={selectedTripId} />
    </Container>
  );
};

export default DriverStatus;