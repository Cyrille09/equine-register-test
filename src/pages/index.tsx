import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import moment from 'moment';
import { Button } from '../components/button';
import { Input } from '../components/fields/input';
import { Layout } from '../components/layout';
import Mapbox from '../components/map';
import data from '../components/data/data';
import Logo from '../components/logo';
function Index() {
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [fromDateError, setFromDateError] = useState<string>('');
  const [toDateError, setToDateError] = useState<string>('');
  const navigate = useNavigate();
  let equines: any;
  let ueln: any;

  useEffect(() => {
    getUserCurrentPosition();
  }, [latitude, longitude]);

  function getUserCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }

  function validator(values: any) {
    const errors: any = {};

    if (!values.ueln) {
      errors.ueln = `${' '}`;
    } else if (values.ueln) {
      for ({ equines } of data) {
        for ({ ueln } of equines) {
          if (values.ueln === ueln) {
            break;
          } else {
            errors.ueln = `${'UELN, Passport or Microchip Number does not match to our record'}`;
            continue;
          }
        }
      }
    }
    if (!values.fromDay) {
      errors.fromDay = `${' '}`;
    } else if (
      values.fromDay &&
      !/^\d{2}$/.test(values.fromDay.toString().replace(/\s/g, ''))
    ) {
      errors.fromDay = `${' '}`;
    } else if (values.fromDay && values.fromDay > 31) {
      errors.fromDay = `${' '}`;
    }
    if (!values.fromMonth) {
      errors.fromMonth = `${' '}`;
    } else if (
      values.fromMonth &&
      !/^\d{2}$/.test(values.fromMonth.toString().replace(/\s/g, ''))
    ) {
      errors.fromMonth = `${' '}`;
    } else if (values.fromMonth && values.fromMonth > 12) {
      errors.fromMonth = `${' '}`;
    }

    if (!values.fromYear) {
      errors.fromYear = `${' '}`;
    } else if (
      values.fromYear &&
      !/^\d{4}$/.test(values.fromYear.toString().replace(/\s/g, ''))
    ) {
      errors.fromYear = `${' '}`;
    } else if (
      values.fromYear &&
      values.fromYear &&
      !/(?:(?:19|20)[0-9]{2})/.test(
        values.fromYear.toString().replace(/\s/g, '') // This works for 1900 to 2099
      )
    ) {
      errors.fromYear = `${' '}`;
    }
    if (!values.toDay) {
      errors.toDay = `${' '}`;
    } else if (
      values.toDay &&
      !/^\d{2}$/.test(values.toDay.toString().replace(/\s/g, ''))
    ) {
      errors.toDay = `${' '}`;
    } else if (values.toDay && values.toDay > 31) {
      errors.toDay = `${' '}`;
    }

    if (!values.toMonth) {
      errors.toMonth = `${' '}`;
    } else if (
      values.toMonth &&
      !/^\d{2}$/.test(values.toMonth.toString().replace(/\s/g, ''))
    ) {
      errors.toMonth = `${' '}`;
    } else if (values.toMonth && values.toMonth > 12) {
      errors.toMonth = `${' '}`;
    }

    if (!values.toYear) {
      errors.toYear = `${' '}`;
    } else if (
      values.toYear &&
      !/^\d{4}$/.test(values.toYear.toString().replace(/\s/g, ''))
    ) {
      errors.toYear = `${' '}`;
    } else if (
      values.toYear &&
      values.toYear &&
      !/(?:(?:19|20)[0-9]{2})/.test(
        values.toYear.toString().replace(/\s/g, '') // This works for 1900 to 2099
      )
    ) {
      errors.toYear = `${' '}`;
    }

    return errors;
  }

  function updateRecord(values: any) {
    let fromDateValue: string = `${values.fromYear}-${values.fromMonth}-${values.fromDay}`;
    let toDateValue: string = `${values.toYear}-${values.toMonth}-${values.toDay}`;

    if (
      moment(fromDateValue).isValid() === false ||
      moment(toDateValue).isValid() === false
    ) {
      if (moment(fromDateValue).isValid() === false) {
        setFromDateError(
          `${values.fromDay}-${values.fromMonth}-${values.fromYear} is not a valid date`
        );
      } else {
        setFromDateError('');
      }

      if (moment(toDateValue).isValid() === false) {
        setToDateError(
          `${values.toDay}-${values.toMonth}-${values.toYear} is not a valid date`
        );
      } else {
        setToDateError('');
      }

      return;
    } else {
      setFromDateError('');
      setToDateError('');
      navigate('/search', {
        state: {
          ueln: values.ueln,
          dateFrom: fromDateValue,
          dateTo: toDateValue,
        },
      });
    }
  }
  const initialValues = {
    ueln: '',
    fromDay: '',
    fromMonth: '',
    fromYear: '',
    toDay: '',
    toMonth: '',
    toYear: '',
  };
  return (
    <Layout title="Home">
      <div className="row">
        <div className="col-md-6 col-12">
          <Logo />
          <div className="searchMain">
            <Formik
              form
              initialValues={initialValues}
              validate={validator}
              onSubmit={updateRecord}
              enableReinitialize={true}
            >
              <Form>
                <Input
                  label="Enter UELN, Passport or Microchip Number"
                  placeholder="8540001"
                  type="text"
                  name="ueln"
                  id="ueln"
                  className="FiledSizeUELN"
                />

                <div className="homeUeln">
                  <p>
                    Enter search date range <br />
                    <span>Enter the date range to search between</span>
                  </p>
                </div>

                <div className="row">
                  <div className="col-md-5 col-12">
                    <span>From date</span>

                    <div className="imputDateList">
                      <Input
                        label="Day"
                        placeholder="25"
                        type="text"
                        name="fromDay"
                        id="fromDay"
                        className="reduceFiledSize"
                        max={2}
                      />
                      <Input
                        label="Month"
                        placeholder="10"
                        type="text"
                        name="fromMonth"
                        id="fromMonth"
                        className="reduceFiledSize"
                      />
                      <Input
                        label="Year"
                        placeholder="2019"
                        type="text"
                        name="fromYear"
                        id="fromYear"
                        className="reduceFiledSizeYear"
                      />
                    </div>
                    {fromDateError && (
                      <span className="messageError">{fromDateError}</span>
                    )}
                  </div>

                  <div className="col-md-2 col-12 toSpan">
                    <span>to</span>
                  </div>

                  <div className="col-md-5 col-12">
                    <span>To date</span>
                    <div className="imputDateList">
                      <Input
                        label="Day"
                        placeholder="25"
                        type="text"
                        name="toDay"
                        id="toDay"
                        className="reduceFiledSize"
                      />
                      <Input
                        label="Month"
                        placeholder="10"
                        type="text"
                        name="toMonth"
                        id="toMonth"
                        className="reduceFiledSize"
                      />
                      <Input
                        label="Year"
                        placeholder="2019"
                        type="text"
                        name="toYear"
                        id="toYear"
                        className="reduceFiledSizeYear"
                      />
                    </div>
                    {toDateError && (
                      <span className="messageError">{toDateError}</span>
                    )}
                  </div>
                </div>

                <div className="homeButton">
                  <Button
                    type="submit"
                    format="fourth"
                    small
                    className="buttonClassUpdate"
                  >
                    Search now{' '}
                    <span className="searchIcon">
                      <FaAngleRight />
                    </span>
                  </Button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>

        <div className="col-md-6 col-12">
          <Mapbox latitude={latitude} longitude={longitude} url="home" />
        </div>
      </div>
    </Layout>
  );
}
export default Index;
