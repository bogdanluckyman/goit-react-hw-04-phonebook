import { Formik } from 'formik';
import { Form, Field, FormGroup } from './Form.styled';

export const ContactForm = ({ addContact }) => (
  <div>
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      onSubmit={(values, actions) => {
        addContact(values);
        actions.resetForm();
      }}
    >
      <Form>
        <FormGroup>
          Name
          <Field name="name" />
        </FormGroup>
        <FormGroup>
          Number
          <Field name="number" type="number" />
        </FormGroup>

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  </div>
);
