export interface Holiday {
    name: string;
    date: string; // ISO format
    type: 'Regular' | 'Special Non-Working' | 'Special Working' | 'Observance';
  }
  
  // Hardcode the Philippine holidays for the year 2025
  export function fetchPhilippineHolidays(year: number): Holiday[] {
    if (year !== 2025) {
      throw new Error('Only the year 2025 is hardcoded for holidays');
    }
  
    return [
      {
        name: 'New Year\'s Day',
        date: '2025-01-01',
        type: 'Regular',
      },
      {
        name: 'Maundy Thursday',
        date: '2025-04-17',
        type: 'Special Non-Working',
      },
      {
        name: 'Good Friday',
        date: '2025-04-18',
        type: 'Regular',
      },
      {
        name: 'Araw ng Kagitingan',
        date: '2025-04-09',
        type: 'Regular',
      },
      {
        name: 'Labor Day',
        date: '2025-05-01',
        type: 'Regular',
      },
      {
        name: 'Independence Day',
        date: '2025-06-12',
        type: 'Regular',
      },
      {
        name: 'National Heroes Day',
        date: '2025-08-31',
        type: 'Regular',
      },
      {
        name: 'Eid al-Fitr',
        date: '2025-05-22',
        type: 'Special Non-Working',
      },
      {
        name: 'Eid al-Adha',
        date: '2025-06-29',
        type: 'Special Non-Working',
      },
      {
        name: 'Bonifacio Day',
        date: '2025-11-30',
        type: 'Regular',
      },
      {
        name: 'Christmas Day',
        date: '2025-12-25',
        type: 'Regular',
      },
      {
        name: 'Rizal Day',
        date: '2025-12-30',
        type: 'Regular',
      },
      {
        name: 'New Year\'s Eve',
        date: '2025-12-31',
        type: 'Special Non-Working',
      },
      {
        name: 'Chinese New Year',
        date: '2025-02-17',
        type: 'Special Non-Working',
      },
      {
        name: 'EDSA People Power Revolution Anniversary',
        date: '2025-02-25',
        type: 'Special Non-Working',
      },
      {
        name: 'Black Saturday',
        date: '2025-04-19',
        type: 'Special Non-Working',
      },
      {
        name: 'Ninoy Aquino Day',
        date: '2025-08-21',
        type: 'Special Non-Working',
      },
      {
        name: 'All Saints’ Day',
        date: '2025-11-01',
        type: 'Special Non-Working',
      },
      {
        name: 'All Souls’ Day',
        date: '2025-11-02',
        type: 'Special Non-Working',
      },
      {
        name: 'Feast of the Immaculate Conception of the Blessed Virgin Mary',
        date: '2025-12-08',
        type: 'Special Non-Working',
      },
    ];
  }
  