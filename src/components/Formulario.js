import React, {useState} from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import Error from './Error';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);
    
    const agregarGasto = (e) => {
        e.preventDefault();
    
        // validate
        if(cantidad < 1 || isNaN( cantidad) || nombre.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);
        // build the expense
        const gasto = {
            nombre, 
            cantidad, 
            id: shortid.generate()
        }
    
        // give the expense to the principal component
        guardarGasto(gasto);
        guardarCrearGasto(true);
    
        // reset the form
        guardarNombre('');
        guardarCantidad(0);
    }


    return ( 
        <form onSubmit={agregarGasto}>
            <h2> Add your expenses here</h2>

            {error 
                ? 
                    <Error mensaje={"Both fields are required or wrong budget"} />
                :
                    null
            }

            <div className='campo'>
                <label>Expenses name</label>
                <input
                    type="text"
                    className='u-full-width'
                    placeholder='e.g. Transport'
                    value={nombre}
                    onChange={ e => guardarNombre(e.target.value) }
                />
            </div>

            <div className='campo'>
                <label>Expenses mount</label>
                <input
                    type="number"
                    className='u-full-width'
                    placeholder='e.g. 300'
                    value={cantidad}
                    onChange={e => guardarCantidad( parseInt(e.target.value, 10) )}
                />
            </div>

            <input
                type="submit"
                className='button-primary u-full.width'
                value="Add expense"
            />
        </form>
     );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}

export default Formulario;