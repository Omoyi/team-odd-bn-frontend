import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'
import '../../../assets/css/sidenav/SideDrawer.scss'
import defaultUserIcon from '../../../assets/images/default_user_icon/default_user_64px.png'
import houseIcon from '../../../assets/images/home_icon/house_24px.png'
import tripIcon from '../../../assets/images/trip_icon/trip_24px.png'
import bookingIcon from '../../../assets/images/booking_icon/booking_24px.png'
import accommodationIcon from '../../../assets/images/accommodation_icon/accommodation_24px.png'
import logoutIcon from '../../../assets/images/logout_icon/logout_24px.png'
import signoutUser from '../../../redux/actions/signoutAction'

export class SideDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: defaultUserIcon,
      firstName: '',
      lastName: '',
    }
  }

  UNSAFE_componentWillReceiveProps(prevProps, nextProps) {
    const { profile } = prevProps;
    if (profile.data) {
      const { data: { imageURL, user: { firstName, lastName } } } = profile;
      this.setState({
        image: imageURL,
        firstName,
        lastName,
      })
    }
  }

  logout = async () => {
    await this.props.signoutUser()
    return this.props.history.push('/signin')
  }

  render() {
    let drawerClasses = 'side-drawer'
    const { show } = this.props
    const { image, firstName, lastName } = this.state

    if (show) {
      drawerClasses = 'side-drawer open'
    }

    return (
      <nav className={drawerClasses}>
        <div className="user-info">
          <img className="profile-icon" src={image} alt="profile icon" />
          <p className="username">{`${firstName} ${lastName}`}</p>
        </div>
        <ul>
          <li>
            <Link to="/home">
              <img src={houseIcon} alt="homepage icon" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/trips">
              <img src={tripIcon} alt="trip icon" />
              <span>Trips</span>
            </Link>
          </li>
          <li>
            <Link to="/bookings">
              <img src={bookingIcon} alt="booking icon" />
              <span>Bookings</span>
            </Link>
          </li>
          <li>
            <Link to="accommodation/create">
              <img src={accommodationIcon} alt="accommodation icon" />
              <span>Accomodations</span>
            </Link>
          </li>
          <li>
            <Link to="#" onClick={this.logout} className="signout">
              <img src={logoutIcon} alt="logout icon" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.viewProfile.profile,
    profileError: state.profileError,
    isLoggedIn: state,
  }
}

SideDrawer.propTypes = {
  signoutUser: Proptypes.func.isRequired,
  history: Proptypes.shape({
    push: Proptypes.func,
  }),
}

SideDrawer.defaultProps = {
  history: {
    push: () => {},
  },
}

export default withRouter(connect(mapStateToProps, { signoutUser })(SideDrawer))
