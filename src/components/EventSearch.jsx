import { Input } from "@chakra-ui/react";

export const EventSearch = ({ searchTerm, onSearchChange }) => {

    return (
        <Input
            placeholder="Search event by name.."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            w='xl'
        >

        </Input>
    );
}