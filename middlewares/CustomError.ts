import { AxiosError} from "axios"

class CustomError extends Error {
  constructor() {
    super("Err Message"); 
  }
}

// const newError = new CustomError();
// console.log(newError); 
// {
//     message: "Err message"
// }

const login = (email, pwd) => {
  // ''
  // if(typeof email !== "string") throw new Error('Invalid email')
  //
};

const fetchPrd = () => {
  throw new CustomError();
};

const fn = () => {
  try {
    login(143, "anas@gmail.com");
    fetchPrd();
  } catch (err) {
    if(err instanceof CustomError) { 
      err.message
    } else if(err instanceof AxiosError) {
      err.response

    } else if(err instanceof Error) {
      
    } else {
      
    }
    console.log(err.message);
  }
};

fn();
