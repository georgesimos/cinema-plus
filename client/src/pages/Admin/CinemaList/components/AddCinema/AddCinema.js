import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Button, TextField, Typography } from '@material-ui/core';
import styles from './styles';
import { Add } from '@material-ui/icons';
import {
  getCinemas,
  createCinemas,
  updateCinemas,
  removeCinemas,
  uploadCinemaImage
} from '../../../../../store/actions';
import { FileUpload } from '../../../../../components';
import { useHistory, withRouter } from 'react-router-dom';

class AddCinema extends Component {
  state = {
    _id: '',
    name: '',
    image: null,
    imagePreview: null,
    imageUrl: '',
    ticketPrice: '',
    seatsAvailable: '',
    seats: [],
    notification: {}
  };

  componentDidMount() {
    if (this.props.editCinema) {
      const { image, ...rest } = this.props.editCinema;
      this.setState({ 
        ...rest,
        imageUrl: image // Сохраняем URL изображения
      });
    }
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);

    // Если изменилось изображение, создаем превью
    if (field === 'image' && value) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          imagePreview: reader.result,
          imageUrl: '' // Очищаем старый URL при выборе нового файла
        });
      };
      reader.readAsDataURL(value);
    }
  };

  onSubmitAction = async type => {
    const {
      getCinemas,
      createCinemas,
      updateCinemas,
      removeCinemas,
      uploadCinemaImage
    } = this.props;
    const {
      _id,
      name,
      image,
      ticketPrice,
      seatsAvailable,
      seats
    } = this.state;
    const cinema = { name, ticketPrice, seatsAvailable, seats };
    let notification = {};
    let response;
    
    try {
      if (type === 'create') {
        console.log('Creating cinema...');
        response = await createCinemas(image, cinema);
        console.log('Create response:', response);
        
        if (response && response.status === 'success') {
          // Получаем обновленный список залов
          const cinemas = await getCinemas();
          const createdCinema = cinemas.find(c => c.name === name);
          if (createdCinema) {
            // Обновляем состояние с новым изображением
            this.setState({
              imageUrl: createdCinema.image,
              imagePreview: null // Очищаем превью, так как теперь есть реальный URL
            });
            console.log('Redirecting to:', `/admin/cinemas/configure-seats/${createdCinema._id}`);
            this.props.history.push(`/admin/cinemas/configure-seats/${createdCinema._id}`);
          } else {
            console.error('Created cinema not found in list');
            this.setState({
              notification: {
                status: 'error',
                message: 'Ошибка при создании зала: зал не найден в списке'
              }
            });
          }
          return;
        }
      } else if (type === 'update') {
        // Сначала обновляем основные данные
        notification = await updateCinemas(null, cinema, _id); // Передаем null вместо image
        
        if (notification.status === 'success' && image) {
          // Если есть новое изображение, загружаем его отдельно
          const imageResponse = await uploadCinemaImage(_id, image);
          if (imageResponse && imageResponse.cinema) {
            this.setState({
              imageUrl: imageResponse.cinema.image,
              imagePreview: null,
              image: null // Очищаем выбранный файл
            });
          }
        }
      } else {
        notification = await removeCinemas(_id);
      }
      
      if (notification.status === 'success') {
        this.props.handleClose();
      }
      
      this.setState({ notification });
    } catch (error) {
      console.error('Error in onSubmitAction:', error);
      this.setState({
        notification: {
          status: 'error',
          message: error.message || 'Произошла ошибка при выполнении операции'
        }
      });
    }
  };

  handleSeatsChange = (index, value) => {
    if (value > 10) return;
    const { seats } = this.state;
    seats[index] = Array.from({ length: value }, (_, i) => ({
      number: i + 1,
      coefficient: 1.0
    }));
    this.setState({
      seats
    });
  };

  onAddSeatRow = () => {
    this.setState(prevState => ({
      seats: [...prevState.seats, []]
    }));
  };

  renderSeatFields = () => {
    const { seats } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div className={classes.field}>
          <Button onClick={() => this.onAddSeatRow()}>
            <Add /> Добавить ряд
          </Button>
        </div>
        {seats.length > 0 &&
          seats.map((seat, index) => (
            <div key={`seat-${index}-${seat.length}`} className={classes.field}>
              <TextField
                key={`new-seat-${index}`}
                className={classes.textField}
                label={
                  'Количество мест для ряда : ' +
                  (index + 10).toString(36).toUpperCase()
                }
                margin="dense"
                required
                value={seat.length}
                variant="outlined"
                type="number"
                inputProps={{
                  min: 0,
                  max: 10
                }}
                onChange={event =>
                  this.handleSeatsChange(index, event.target.value)
                }
              />
            </div>
          ))}
      </>
    );
  };

  render() {
    const { classes, className } = this.props;
    const {
      _id,
      name,
      image,
      imagePreview,
      imageUrl,
      ticketPrice,
      seatsAvailable,
      notification
    } = this.state;

    const rootClassName = classNames(classes.root, className);
    const mainTitle = this.props.editCinema ? 'Редактировать зал' : 'Добавить зал';
    const submitButton = this.props.editCinema
      ? 'Обновить зал'
      : 'Добавить';
    const submitAction = this.props.editCinema
      ? () => this.onSubmitAction('update')
      : () => this.onSubmitAction('create');

    return (
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.title}>
          {mainTitle}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              helperText="Пожалуйста, укажите название зала"
              label="Название"
              margin="dense"
              required
              value={name}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('name', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <FileUpload
              className={classes.textField}
              file={image}
              preview={imagePreview || imageUrl}
              onUpload={event => {
                const file = event.target.files[0];
                this.handleFieldChange('image', file);
              }}
            />
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              label="Стоимость билета"
              margin="dense"
              type="number"
              value={ticketPrice}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('ticketPrice', event.target.value)
              }
            />
            <TextField
              className={classes.textField}
              label="Доступных мест"
              margin="dense"
              required
              value={seatsAvailable}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('seatsAvailable', event.target.value)
              }
            />
          </div>
          {this.renderSeatFields()}
        </form>

        <Button
          className={classes.buttonFooter}
          color="primary"
          variant="contained"
          onClick={submitAction}
        >
          {submitButton}
        </Button>
        {this.props.editCinema && (
          <Button
            color="secondary"
            className={classes.buttonFooter}
            variant="contained"
            onClick={() => this.onSubmitAction('remove')}
          >
            Удалить зал
          </Button>
        )}

        {notification && notification.status ? (
          notification.status === 'success' ? (
            <Typography
              className={classes.infoMessage}
              color="primary"
              variant="caption"
            >
              {notification.message}
            </Typography>
          ) : (
            <Typography
              className={classes.infoMessage}
              color="error"
              variant="caption"
            >
              {notification.message}
            </Typography>
          )
        ) : null}
      </div>
    );
  }
}

AddCinema.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  editCinema: PropTypes.object,
  handleClose: PropTypes.func
};

const mapStateToProps = null;
const mapDispatchToProps = {
  getCinemas,
  createCinemas,
  updateCinemas,
  removeCinemas,
  uploadCinemaImage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(AddCinema)));
