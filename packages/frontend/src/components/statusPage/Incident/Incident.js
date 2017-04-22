import React, { PropTypes } from 'react'
import classnames from 'classnames'
import ModestLink from 'components/common/ModestLink'
import IncidentItem from 'components/statusPage/IncidentItem'
import { serviceName } from 'utils/settings'
import classes from './Incident.scss'

export default class Incident extends React.Component {
  static propTypes = {
    incidentID: PropTypes.string.isRequired,
    incident: PropTypes.shape({
      incidentID: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string,
      incidentUpdates: PropTypes.arrayOf(PropTypes.shape({
        incidentUpdateID: PropTypes.string.isRequired,
        incidentStatus: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired
      }).isRequired)
    }),
    fetchIncidents: PropTypes.func.isRequired
  }

  componentDidMount () {
    if (!this.props.incident) {
      this.props.fetchIncidents(this.props.incidentID)
    }
  }

  render () {
    const { incidentID } = this.props

    return (
      <div className={classnames(classes.layout, 'mdl-grid')}>
        <div className='mdl-cell mdl-cell--12-col'>
          <h4>Incident Report for {serviceName}</h4>
        </div>
        <div className='mdl-cell mdl-cell--12-col mdl-list'>
          {(this.props.incident) ? <IncidentItem key={incidentID} incidentID={incidentID} autoloadDetail /> : ''}
        </div>
        <ModestLink link='/' text='Current Incidents' />
      </div>
    )
  }
}
