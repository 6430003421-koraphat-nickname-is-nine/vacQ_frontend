import {Link} from 'react-router-dom'

import {FaQuestionCircle , FaTicketAlt} from 'react-icons/fa'

function Home(){
    return(
        <>
        <section className = 'heading'>
            <h1>Vac Q: A Vaccine Booking System</h1>
            <p>Please choose from an option below</p>
            <Link to='/new-ticket' className='btn btn-reverse btn-block'>
                <FaQuestionCircle/>Creat New Appointment
            </Link>

            <Link to="/tickets" className='btn btn-block'>
                <FaTicketAlt />View My Appointments
            </Link>
        </section>
        </>
    )
}

export default Home;