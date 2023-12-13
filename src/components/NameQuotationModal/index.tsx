import { FC, useContext, useEffect, useRef } from 'react'
import arrow from '../../assets/icons/Arrow-right-green.png'
import { Link } from 'react-router-dom';
import { QuotationContext } from '../../context/QuotationContext';

interface Props {
  isOpen: boolean,
  onClose: () => void
}

export const NameQuotationModal: FC<Props> = ({ isOpen, onClose }) => {

  const modalRef = useRef<HTMLDivElement>(null);
  const { setQuotation } = useContext(QuotationContext)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleQuotationNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuotation(prevState => ({
      ...prevState,
      quoteName: e.target.value
    }))
  }

  const closeModal = () => {
    onClose();
  };

  return (
    <div className={isOpen ? 'fixed inset-0 flex items-start justify-center ' : 'hidden'}>
      <div className="fixed inset-0 bg-black opacity-80 "></div>
      <div ref={modalRef} className="z-50 w-5/12 bg-white rounded-lg shadow-lg mt-32 px-20 py-14">
        <div className="flex">
          <h3 className='font-outfit text-vivvi text-4xl text-center'>Escribe el nombre de tu cotización</h3>
        </div>
        <div className="mt-4 flex flex-col gap-7">
          <input placeholder='Ej: Mi casita 01' name='quoteName' className='p-5 text-2xl bg-gray-200 rounded-full w-full' onChange={handleQuotationNameChange} />
          <Link to={'/dashboard/1'} className='border border-vivvi rounded-full bg-dorado text-center w-full text-vivvi font-roboto text-base py-2.5 flex justify-center items-center gap-2'>
            <p>
              Continuar
            </p>
            <img src={arrow} alt='arrow' />
          </Link>
        </div>
      </div>
    </div>
  );
};

