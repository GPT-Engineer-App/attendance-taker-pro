import React, { useState } from "react";
import { Box, Heading, Input, Button, List, ListItem, ListIcon, VStack, HStack, useToast } from "@chakra-ui/react";
import { FaPlus, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Index = () => {
  const [attendees, setAttendees] = useState([]);
  const [newAttendee, setNewAttendee] = useState("");
  const toast = useToast();

  const handleAddAttendee = () => {
    if (newAttendee.trim() === "") {
      toast({
        title: "Error",
        description: "Attendee's name cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setAttendees([...attendees, { name: newAttendee, present: false }]);
    setNewAttendee("");
  };

  const handleAttendeePresence = (index, presence) => {
    const updatedAttendees = attendees.map((attendee, i) => (i === index ? { ...attendee, present: presence } : attendee));
    setAttendees(updatedAttendees);
  };

  return (
    <VStack spacing={6}>
      <Heading my={6}>Attendance Taker</Heading>
      <HStack>
        <Input value={newAttendee} onChange={(e) => setNewAttendee(e.target.value)} placeholder="Enter attendee's name" />
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddAttendee}>
          Add Attendee
        </Button>
      </HStack>
      <Box w="100%" p={4} borderWidth="1px" borderRadius="lg">
        <List spacing={3}>
          {attendees.map((attendee, index) => (
            <ListItem key={index}>
              <HStack justify="space-between">
                <Box>{attendee.name}</Box>
                <HStack>
                  <Button size="sm" leftIcon={<FaCheckCircle />} colorScheme={attendee.present ? "green" : "gray"} onClick={() => handleAttendeePresence(index, true)}>
                    Present
                  </Button>
                  <Button size="sm" leftIcon={<FaTimesCircle />} colorScheme={!attendee.present ? "red" : "gray"} onClick={() => handleAttendeePresence(index, false)}>
                    Absent
                  </Button>
                </HStack>
              </HStack>
            </ListItem>
          ))}
        </List>
      </Box>
    </VStack>
  );
};

export default Index;
