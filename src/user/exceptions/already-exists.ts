type Error_Name = 'CONFLICT' | 'NOT_FOUND';

class AlreadyExistsException extends Error {
  name: Error_Name;
  message: string;

  constructor(name: Error_Name, message: string) {
    super();

    this.name = name;
    this.message = message;
  }
}

export default AlreadyExistsException;
