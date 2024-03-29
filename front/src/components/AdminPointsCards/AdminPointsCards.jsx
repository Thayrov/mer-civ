import AdminPoint from './AdminPointsCard.jsx';
import { useSelector } from 'react-redux/es/hooks/useSelector.js';

export default function AdminPointsCards({ className }) {
  const { items } = useSelector((state) => state.salesPoint);

  return (
    <div className={`${className} mt-4 w-full max-w-[1280px] flex flex-wrap justify-center`}>
      {items && items.length > 0 ? (
        items.map((point) => {
          let set = new Set();
          point.inventario.forEach((element) => {
            set.add(element.proveedor_id);
          });
          return (
            <AdminPoint
              className='mb-4 max-w-[800px] w-full'
              key={point.id}
              image={point.image}
              company_name={point.company_name}
              address={point.address}
              postal_code={point.postal_code}
              contact_email={point.contact_email}
              contact_tel={point.contact_tel}
              id={point.id}
              proveedores={Array.from(set).length}
              inventario={point.inventario}
            />
          );
        })
      ) : (
        <p>No hay puntos de venta</p>
      )}
    </div>
  );
}
