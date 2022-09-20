const initialState = {
  dogs: [],
  allDogs: [], //es una copia de dogs, sirve para hacer el filtro sobre esta prop y no sobre dogs para q no haya problemas como q filtramos un array ya filtrado
  temperaments: [],
  details: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    // case "GET_TEMPERAMENTS":
    //   return {
    //     ...state,
    //     temperaments: action.payload,
    //   };

    // case "GET_BY_NAME":
    //   return {
    //     ...state,
    //     dogs: action.payload,
    //   };

    // case "GET_BY_ID":
    //   return {
    //     ...state,
    //     details: action.payload,
    //   };

    // case 'CLEAR_DETAIL':
    //   return {
    //     ...state,
    //     details: []
    //   };

    // case "ORDER_BY_NAME":
    //   if (state.dogs === 'Dog not found :(') return { ...state } //para q la app no se rompa al intentar ordenar el string dog not found
    //   const orderedByName =
    //     action.payload === "ascendente"
    //       ? state.dogs.sort((a, b) => {
    //           if (a.name > b.name) return 1;
    //           if (a.name < b.name) return -1;
    //           return 0;
    //         })
    //       : state.dogs.sort((a, b) => {
    //           if (a.name > b.name) return -1;
    //           if (a.name < b.name) return 1;
    //           return 0;
    //         });
    //   return {
    //     ...state,
    //     dogs: orderedByName,
    //   };

    // case "ORDER_BY_WEIGHT":
    //   if (state.dogs === 'Dog not found :(') return { ...state } //para q la app no se rompa al intentar ordenar el string dog not found
    //   const orderedByWeight =
    //     action.payload === "menor"
    //       ? state.dogs.sort((a, b) => {
    //           if (a.weight.includes('NaN')) {
    //             return 1000;
    //           } else {
    //             if (parseInt(a.weight.split(' - ')[0]) > parseInt(b.weight.split(' - ')[0])) return 1;
    //             if (parseInt(a.weight.split(' - ')[0]) < parseInt(b.weight.split(' - ')[0])) return -1;
    //             return 0;
    //           }
    //         })
    //       : state.dogs.sort((a, b) => {
    //           if (a.weight.includes('NaN')) {
    //             return 1000;
    //           } else {
    //             if (parseInt(a.weight.split(' - ')[0]) < parseInt(b.weight.split(' - ')[0])) return 1;
    //             if (parseInt(a.weight.split(' - ')[0]) > parseInt(b.weight.split(' - ')[0])) return -1;
    //             return 0;
    //           }
    //         });
    //   return {
    //     ...state,
    //     dogs: orderedByWeight,
    //   };

    // case "FILTER_BY_TEMPERAMENT":
    //   const allDogs = state.allDogs;
    //   const filterDog =
    //     action.payload === "all"
    //       ? allDogs
    //       : allDogs.filter((d) => d.temperaments?.includes(action.payload));
    //   return {
    //     ...state,
    //     dogs: filterDog,
    //   };

    // case "FILTER_CREATED":
    //   const allDogs2 = state.allDogs;
    //   let filterCreation = null;
    //   if (action.payload === "all") filterCreation = allDogs2;
    //   else if (action.payload === "created")
    //     filterCreation = allDogs2.filter((dog) => dog.createdInDB);
    //   else if (action.payload === "api")
    //     filterCreation = allDogs2.filter((dog) => !dog.createdInDB);
    //   return {
    //     ...state,
    //     dogs: filterCreation,
    //   };

    // case "CREATE_DOG":
    //   return {
    //     ...state,
    //   };

    // case "DELETE_DOG":
    //   return {
    //     ...state,
    //   };
    
    // case "EDIT_DOG":
    //   return {
    //     ...state,
    //   };

    default:
      return { ...state };
  }
}

export default rootReducer;