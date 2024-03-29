import PointProduct from './PointProduct.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { useEffect, useState, useRef } from 'react';
import NewInventoryModal from './NewInventoryModal.jsx';
import { useDispatch } from 'react-redux';
import { fetchSalesPointsAsync } from '../../store/thunks/salesPointThunks.js';

export default function PointProducts({ className, pointId, address, name }) {
  // puntoDeVntaId, productoId, proveedorId, cantidad, precio, stockMin, stockMax
  // name, description, marca, proveedoresCostos, photo

  const dispatch = useDispatch();
  const [punto, setPunto] = useState([]);
  const pointIdRef = useRef(pointId);

  const [refreshAllProducts, setRefreshAllProducts] = useState(false);

  function handleRefreshAllProducts() {
    setRefreshAllProducts(true);
  }

  useEffect(() => {
    if (refreshAllProducts) {
      setPunto();
      (async function () {
        const { payload } = await dispatch(fetchSalesPointsAsync(pointIdRef.current));
        setPunto(payload);
      })();
    }

    setRefreshAllProducts(false);
  }, [dispatch, refreshAllProducts]);

  useEffect(() => {
    pointIdRef.current = pointId;
  }, [pointId]);

  useEffect(() => {
    (async function () {
      const { payload } = await dispatch(fetchSalesPointsAsync(pointIdRef.current));
      setPunto(payload);
    })();
  }, [dispatch, pointIdRef.current]);

  const [modal, setModal] = useState(false);

  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  return (
    <>
      {modal && (
        <NewInventoryModal
          openModal={true}
          closeModal={closeModal}
          id={pointId}
          address={address}
          name={name}
          handleRefreshAllProducts={handleRefreshAllProducts}
        />
      )}
      <div className={className}>
        <h3 className='text-tuscany-600'>Productos de este punto</h3>

        <CustomButton className='m-2' onClick={openModal} text='Agregar producto' />
        {punto && punto.inventario && !punto.inventario.length < 1 ? (
          punto.inventario.map((item) => (
            <PointProduct
              key={item.id}
              inventarioId={item.id}
              puntoDeVentaId={item.punto_de_venta_id}
              productoId={item.producto_id}
              proveedorId={item.proveedor_id}
              cantidad={item.stock}
              stockMin={item.stock_min}
              stockMax={item.stock_max}
              handleRefreshAllProducts={handleRefreshAllProducts}
            />
          ))
        ) : (
          <p className='text-lg text-tuscany-950 my-4 mx-auto max-w-[600px] p-2'>
            No hay productos para este punto. Crea un inventario y agregale stock de un producto
            utilizando el botón de arriba.
          </p>
        )}
      </div>
    </>
  );
}
