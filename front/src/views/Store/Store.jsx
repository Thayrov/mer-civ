/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { fetchPuntosSelector } from '../../store/thunks/cardsThunks.js';
import { Box } from '@mui/material';
import CustomSelect from '../../components/CustomBlurSelect/CustomBlurSelect';
import Cards from '../../components/Cards/Cards';
import Footer from '../../components/Footer/Footer';
import StoreFilters from '../../components/StoreFilters/StoreFilters';
import { useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import { getCartDBThunk, getCartIdThunk } from '../../store/thunks/cartThunks.js';
import FilterTags from '../../components/StoreFilters/FilterTags.jsx';
import FilterMenu from '../../components/StoreFilters/FilterMenu.jsx';

import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { fetchSalesPointsAsync } from '../../store/thunks/salesPointThunks.js';
import { createToast } from '../../store/slices/toastSlice.js';
import Carrousel from '../../components/Carrousel/Carrousel.jsx';

const Store = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { puntos } = useSelector((state) => state.card);
  const { idCarrito } = useSelector((state) => state.carrito);
  const { allItems, filteredItems } = useSelector((state) => state.card);
  const { puntoId } = useParams();

  const [pointData, setPointData] = useState();
  // Info del punto que se carga si hay un id de punto en params
  useEffect(() => {
    (async function () {
      const { payload } = await dispatch(fetchSalesPointsAsync(puntoId));
      if (!payload.address && puntoId) {
        navigate('/store');
        dispatch(createToast('No se encontró el punto al que estás intentando ingresar'));
      } else {
        setPointData(payload);
      }
    })();
  }, [dispatch]);

  const firstRenderDispatch = async () => {
    await dispatch(fetchPuntosSelector());
    if (idCarrito === null) {
      await dispatch(getCartIdThunk());
      await dispatch(getCartDBThunk());
    }
  };

  useEffect(() => {
    firstRenderDispatch();
  }, []);

  const citiesOptions = puntos.map((p) => {
    return {
      value: p.id,
      label: p.company_name,
    };
  });

  return (
    <div className='flex flex-col min-h-[calc(100vh-55px)]'>
      <div className='flex flex-col bg-hippie-green-950'>
        <Box className={`max-w-64 mx-auto w-[100vw] pt-4 mt-4 lg:mt-0 pb-6 lg:translate-y-[40%]`}>
          <CustomSelect
            className={puntoId && 'hidden'}
            label='Localización'
            options={citiesOptions}
          />

          {pointData && (
            <p className={`${!puntoId && 'hidden'} text-lg`}>
              Estas en <span className='font-semibold'>{pointData.address}.</span>
            </p>
          )}
        </Box>
      </div>

      <div className='bg-hippie-green-950 px-4'>
        <SearchBar className='max-w-[380px] mx-auto lg:hidden my-2' />
      </div>

      {/* Div eparador con color verde de fondo, altura del div usado como margin top y bottom */}
      <div className='w-screen bg-hippie-green-950 h-10'></div>

      <div className='relative'>
        <div className='w-screen h-[50%] position absolute bg-hippie-green-950'></div>
        {/* <BannerItem
          className='sm:rounded-none md:rounded-2xl lg:rounded-2xl sm-w-full md:max-w-[500px] lg:max-w-[500px] h-[100px] w-full mx-auto pb-0 transition-all'
          backgroundImage='https://picsum.photos/300'
          chipLabel='Promo'
          description='¡Compra uno y llévate el otro gratis!'
        /> */}
        <div>
          <Carrousel />
        </div>
      </div>

      <StoreFilters />

      <div className='flex flex-row w-full max-w-[1500px] mx-auto'>
        <div className='w-full max-w-[200px] hidden md:inline sticky h-full top-[55px]'>
          <FilterTags className='hidden md:flex flex-wrap justify-center ' tagMargin='m-1' />
          <FilterMenu
            expanded={true}
            activeFilterMenu={true}
            className={'hidden md:flex md:relative w-full md:h-max md:z-[1] flex-shrink-0 sticky'}
          />
        </div>
        {allItems?.length > 0 ? (
          <Cards
            allItems={allItems}
            filteredItems={filteredItems}
            className='w-full max-w-[1300px]'
          />
        ) : (
          <div className='mx-auto items-center my-20 px-2 md:pr-[210px] '>
            <p className='text-tuscany-950 text-xl font-semibold'>
              Parece que no hay resultados...
            </p>

            <p className='text-tuscany-950 text-lg '>
              Intenta eliminar filtros, actualizar la página o seleccionar un punto.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Store;
