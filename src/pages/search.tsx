import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import formatDate from 'date-fns/format';
// import { Button } from '../components/button';
// import { Input } from '../components/fields/input';
import { FaAngleRight, FaMapMarkerAlt } from 'react-icons/fa';
import { Layout } from '../components/layout';
import Mapbox from '../components/map';
import data from '../components/data/data';
import Logo from '../components/logo';

function Search() {
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const location = useLocation();
  const state: any = location.state;

  useEffect(() => {
    getUserCurrentPosition();
  }, [latitude, longitude, state]);

  function getUserCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }

  return (
    <Layout title="Home">
      <div className="row">
        <div className="col-md-6 col-12">
          <Logo />
          <div className="row searchMain">
            <div className="col-12 btn-group">
              <button className="searchLocation">Locations</button>
              <button className="searchHeatMap">Heat Map</button>
            </div>
            <div className="col-12">
              <p>
                Movement locations for UELN: <br />{' '}
                <span className="searchNumber">{state.ueln}</span>
              </p>
            </div>

            <div className="col-6">
              <p>
                From date: <br />
                <span className="searchDate">
                  {formatDate(new Date(state.dateFrom), 'dd/MM/yyyy')}
                </span>
              </p>
            </div>
            <div className="col-6">
              <p>
                To date: <br />
                <span className="searchDate">
                  {formatDate(new Date(state.dateTo), 'dd/MM/yyyy')}
                </span>
              </p>
            </div>
            <div className="col-12">
              {data.map((location, index) => (
                <>
                  <div key={index}>
                    {location.equines.map((result: any, index2: number) => {
                      if (
                        result.ueln === state.ueln &&
                        result.date_from >= state.dateFrom &&
                        result.date_to <= state.dateTo
                      ) {
                        return (
                          <div key={index2}>
                            <hr />
                            <div className="imputDateList">
                              <span className="searchFirstIcon">
                                {' '}
                                <FaMapMarkerAlt />
                              </span>
                              <p>
                                <span className="searchFromTo">{`${formatDate(
                                  new Date(result.date_from),
                                  'dd/MM/yyyy'
                                )} to ${formatDate(
                                  new Date(result.date_to),
                                  'dd/MM/yyyy'
                                )}`}</span>{' '}
                                <br />{' '}
                                <span>{`${result.location.city}, ${result.location.county}`}</span>
                              </p>
                              <span className="searchSecondIcon">
                                {' '}
                                <FaAngleRight />
                              </span>
                            </div>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-6 col-12">
          <Mapbox
            latitude={latitude}
            longitude={longitude}
            url="search"
            ueln={state.ueln}
            dateFrom={state.dateFrom}
            dateTo={state.dateTo}
          />
        </div>
      </div>
    </Layout>
  );
}
export default Search;
