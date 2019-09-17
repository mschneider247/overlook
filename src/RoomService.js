class RoomService {
  constructor() {
    this.services = [];
  }

  addService(service) {
    this.services.push(service);
  }
}

export default RoomService;