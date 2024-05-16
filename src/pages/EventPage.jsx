// This page shows a detailed overview of the event. (name, description, author, start and end time, image), also you can edit, delete or save an event here.
import { useContext, useState } from "react";
import {
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Tag,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Card,
  Avatar,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { CategoryContext } from "../components/CategoryContext";
import { UserContext } from "../components/UserContext";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { EventForm } from "../components/EventForm";
import { DeleteEvent } from "../components/DeleteEvent";

export const loader = async ({ params }) => {
  const eventId = parseInt(params.eventId);
  const event = await (
    await fetch(`http://localhost:3000/events?id=${eventId}`)
  ).json();
  return [event];
};

export const EventPage = () => {
  const [event] = useLoaderData();
  const eventDetails = event.length > 0 ? event[0] : null;
  const { categories } = useContext(CategoryContext);
  const { users } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const createdByUser = eventDetails?.createdBy
    ? users.find((user) => user.id === eventDetails.createdBy)
    : null;

  const handleCheckedItemsUpdate = (checkedItems) => {
    setCheckedItems(checkedItems);
    console.log(checkedItems);
  };

  const handleEditSubmit = async (formData) => {
    setIsLoading(true);
    try {
      formData.categoryIds = checkedItems;

      const update = await fetch(
        `http://localhost:3000/events/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (update.ok) {
        toast({
          title: "Event updated",
          description: "The event has been updated",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast({
        title: "Error",
        description: "Updating event has failed, please try again later",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/${eventDetails.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete event. Status: ${response.status}`);
      }
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Error updating event:", error);
      toast({
        title: "Error",
        description: `Failed to update event`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSave = async () => {
    return toast({
      title: "Saved",
      description: `The event has been saved to your calendar!`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      {isLoading ? (
        <Flex align="center" justify="center" h="100vh">
          <p>Loading..</p>
          <Spinner />
        </Flex>
      ) : (
        <Flex justify="center" align="center" m={"8vh"}>
          <Card backgroundColor="white" variant="elevated">
            <Flex
              flexDir={["column", "row"]}
              justify="center"
              align="center"
              m="auto"
              p={10}
            >
              <Flex
                flexDir="column"
                justify="center"
                alignItems="start"
                gap={10}
                p={5}
              >
                <Heading color="orange">{eventDetails.title}</Heading>
                <Flex flexWrap="wrap" flexDir="row" justify="center" gap={2}>
                  {eventDetails.categoryIds.map((id) => (
                    <Tag
                      key={id}
                      colorScheme="teal"
                      variant="solid"
                      fontSize={["xs", "sm"]}
                    >
                      {categories.find((category) => category.id === id)
                        ?.name || `Unknown Category with id ${id}`}
                    </Tag>
                  ))}
                </Flex>
                <Text>{eventDetails.description}</Text>
                <StatGroup gap={2} w={["xs", "sm"]} flexDir={["column", "row"]}>
                  <Stat>
                    <StatLabel color="black">Starts at:</StatLabel>
                    <StatNumber fontSize="lg">
                      {eventDetails.startTime.substring(0, 10)}{" "}
                      {eventDetails.startTime.substring(11, 16)}
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel color="black">Ends at:</StatLabel>
                    <StatNumber fontSize="lg">
                      {eventDetails.endTime.substring(0, 10)}{" "}
                      {eventDetails.endTime.substring(11, 16)}
                    </StatNumber>
                  </Stat>
                </StatGroup>
                <Card p={2} flexDir="row" align="center" gap={3}>
                  <Avatar src={createdByUser?.image} />
                  <Heading fontSize="sm">{createdByUser?.name}</Heading>
                </Card>
                <Flex flexDir={["column", "row"]} gap={5}>
                  <Button onClick={onOpen} colorScheme="orange">
                    Edit event
                  </Button>
                  <DeleteEvent onDelete={handleDelete} />
                  <Button
                    onClick={handleSave}
                    colorScheme="orange"
                    variant="outline"
                  >
                    Save event
                  </Button>
                </Flex>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalCloseButton />
                    <ModalBody m={4}>
                      <EventForm
                        initialValues={eventDetails}
                        isLoading={isLoading}
                        onSubmit={handleEditSubmit}
                        onClose={onClose}
                        updateCheckedItems={handleCheckedItemsUpdate}
                      />
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Flex>
              <Flex mt={[5, 0]} p={5} justify="start" align="start">
                {eventDetails.image !== "" &&
                eventDetails.image.startsWith("https://") &&
                (eventDetails.image.endsWith(".jpg") ||
                  eventDetails.image.endsWith(".jpeg")) ? (
                  <Image
                    src={eventDetails.image}
                    w={["100vw", 400]}
                    h={200}
                    objectFit="cover"
                  />
                ) : (
                  <Image
                    src="https://assets-global.website-files.com/64022de562115a8189fe542a/6417b40028f930d9c3a3c829_Why-Using-A-Smiley-Face-Survey-Can-Boost-Your-Response-Rate.jpeg"
                    w={["100vw", 400]}
                    h={200}
                    objectFit="cover"
                  />
                )}
              </Flex>
            </Flex>
          </Card>
        </Flex>
      )}
    </>
  );
};
