import React, { useState,useEffect } from "react";
import { Flex, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getColorCode } from "../helper/color";
import { useSelector,useDispatch } from "react-redux";
import { fetchProjects,addProject,updateProject,deleteProject } from "../slice/projectSlice";

const Home = () => {

  const { projects, isLoading, error } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
  };

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const allprojects = projects.filter(
    (project) => !project.isInboxProject && project.name.startsWith(searchText)
  );

  return (
    <Flex gap="middle" vertical className="max-w-[600px] mx-auto">
      <h1 className="text-xl font-bold">My projects</h1>
      <Input
        value={searchText}
        onChange={(e) => handleOnChange(e)}
        addonBefore={<SearchOutlined />}
        placeholder="Search projects"
      />
      <Flex gap={"middle"} vertical className="mt-7">
        <p className="text-medium font-semibold border-b-2 py-2">
          {allprojects.length} Projects
        </p>
        {projects.length > 0 && (
          <ul className="space-y-2">
            {allprojects.map((project) => (
              <p
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
                className="cursor-pointer"
              >
                <span
                  style={{
                    color: getColorCode(project.color),
                    fontWeight: "bold",
                  }}
                >
                  #{" "}
                </span>{" "}
                {project.name}
              </p>
            ))}
          </ul>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
