import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactCard from './ContactCard';
import mockContacts from '../../mockData.json';
import { Contact } from '../../types';

describe('ContactCard', () => {
    const mockContact: Contact = mockContacts[0];

    it('renders contact information', () => {
        render(<ContactCard data={mockContact} isSelected={false} onToggle={jest.fn()} />);

        expect(screen.getByText(mockContact.firstNameLastName)).toBeInTheDocument();
        expect(screen.getByText(mockContact.jobTitle)).toBeInTheDocument();
        expect(screen.getByText(mockContact.emailAddress)).toBeInTheDocument();
    });

    it('displays initials from first and last name', () => {
        render(<ContactCard data={mockContact} isSelected={false} onToggle={jest.fn()} />);
        expect(screen.getByText('RG')).toBeInTheDocument(); // Ron Giles → RG
    });

    it('displays only first letter when name has one word', () => {
        const contact: Contact = { ...mockContact, firstNameLastName: 'Madonna' };
        render(<ContactCard data={contact} isSelected={false} onToggle={jest.fn()} />);
        expect(screen.getByText('M')).toBeInTheDocument();
    });

    it('displays first and last initials for names with middle names', () => {
        const contact: Contact = { ...mockContact, firstNameLastName: 'John Middle Doe' };
        render(<ContactCard data={contact} isSelected={false} onToggle={jest.fn()} />);
        expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('applies selected class when isSelected is true', () => {
        const { container } = render(
            <ContactCard data={mockContact} isSelected={true} onToggle={jest.fn()} />,
        );
        expect(container.firstChild).toHaveClass('selected');
    });

    it('does not apply selected class when isSelected is false', () => {
        const { container } = render(
            <ContactCard data={mockContact} isSelected={false} onToggle={jest.fn()} />,
        );
        expect(container.firstChild).not.toHaveClass('selected');
    });

    it('calls onToggle with contact id when clicked on the name', async () => {
        const handleToggle = jest.fn();
        const user = userEvent.setup();
        render(<ContactCard data={mockContact} isSelected={false} onToggle={handleToggle} />);

        await user.click(screen.getByText(mockContact.firstNameLastName));

        expect(handleToggle).toHaveBeenCalledTimes(1);
        expect(handleToggle).toHaveBeenCalledWith(mockContact.id);
    });

    it('renders email as a mailto link and does not toggle card on click', async () => {
        const handleToggle = jest.fn();
        const user = userEvent.setup();
        render(<ContactCard data={mockContact} isSelected={false} onToggle={handleToggle} />);

        const emailLink = screen.getByRole('link', {
            name: new RegExp(`send email to ${mockContact.firstNameLastName}`, 'i'),
        });

        expect(emailLink).toHaveAttribute('href', `mailto:${mockContact.emailAddress}`);

        await user.click(emailLink);

        expect(handleToggle).not.toHaveBeenCalled();
    });
});
