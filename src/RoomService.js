class RoomService {
  constructor() {
    this.services = [];
    this.servicesToday = [];
  }

  addService(service) {
    this.services.push(service);
  }

  getServicesIncomeByDate(bookedCustomers, today) {
    let servicesToday = this.getServicesByDate(today);
    this.servicesToday = servicesToday;
    return servicesToday.reduce((acc, service) => {
      if (bookedCustomers.includes(service.userID)) {
        acc += service.totalCost
      }
      return acc;
    }, 0);
  }

  getServicesByDate(today) {
    return this.services.filter(service => service.date === today);
  }
}

export default RoomService;